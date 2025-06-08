"use client"

// import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { TopCategories } from "@/models/dashboard"

export const description = "A donut chart"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "var(--chart-1)",
//   },
//   safari: {
//     label: "Safari",
//     color: "var(--chart-2)",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "var(--chart-3)",
//   },
//   edge: {
//     label: "Edge",
//     color: "var(--chart-4)",
//   },
//   other: {
//     label: "Other",
//     color: "var(--chart-5)",
//   },
// } satisfies ChartConfig 

export function DashboardTopCategories({topCategories}: {topCategories: TopCategories[]}) {

    console.log(topCategories)

    const chartData = topCategories.map((item, index) => ({
        category: item.category_name,
        count: item.count,
        fill: `var(--chart-${index + 1})`, // assuming CSS variables for colors
    }));

    const chartConfig = {
        count: {
            label: "Count",
        },
        ...topCategories.reduce((acc, item, index) => {
            acc[item.category_name] = {
            label: item.category_name,
            color: `var(--chart-${index + 1})`,
            };
            return acc;
        }, {} as Record<string, { label: string; color: string }>),
    };

    return (
        <Card className="flex flex-col bg-[var(--background)]">
        <CardHeader className="items-center pb-0">
            <CardTitle> Top Categories </CardTitle>
            <CardDescription>January - December</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="category"
                    innerRadius={60}
                />
            </PieChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            {/* <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            <div className="text-muted-foreground leading-none">
                Showing the most entries in each category for the year.
            </div>
        </CardFooter>
        </Card>
    )
}
