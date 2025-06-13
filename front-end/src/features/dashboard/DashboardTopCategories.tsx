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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { TopCategories } from "@/models/dashboard"


export const description = "A donut chart"


export function DashboardTopCategories({topCategories}: {topCategories: TopCategories[]}) {

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
                    className="mx-auto aspect-square max-h-[250px]  [&_.recharts-pie-label-text]:fill-foreground"
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
                        >
                            {/* {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))} */}
                        </Pie>
                        <ChartLegend 
                            content={<ChartLegendContent nameKey="category" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
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
