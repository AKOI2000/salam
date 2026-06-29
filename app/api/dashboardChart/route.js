import { fetchHogQL, groupByMonth } from "@/app/_lib/helpers";
import { getLeadsApi } from "@/app/_lib/leadsAPI";
import { getProjects } from "@/app/_lib/projectAPI";
import { format, parse } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [visitors, projects, leads] = await Promise.all([
      fetchHogQL(`
      SELECT
        formatDateTime(toStartOfMonth(timestamp), '%Y-%m') AS key, formatDateTime(toStartOfMonth(timestamp), '%b') AS month,
        toStartOfMonth(timestamp) AS monthDate,
        count(DISTINCT distinct_id) AS visitors
      FROM events
      WHERE
        event = '$pageview'
        AND timestamp >= addMonths(now(), -11)
      GROUP BY monthDate, month
      ORDER BY monthDate ASC
    `),

      getProjects(),

      getLeadsApi(),
    ]);

    const leadsByMonth = groupByMonth(leads);
    const projectsByMonth = groupByMonth(projects);

    const chartData = visitors.map((item) => ({
      Date: format(parse(item.key, "yyyy-MM", new Date()), "MMM yyyy"),
      Visitors: Number(item.visitors),
      Leads: leadsByMonth[item.key] ?? 0,
      Projects: projectsByMonth[item.key] ?? 0,
    }));

    return NextResponse.json(chartData);
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
