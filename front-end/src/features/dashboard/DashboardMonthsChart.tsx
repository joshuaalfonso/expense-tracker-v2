





"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

import type { ChartConfig } from "@/components/ui/chart"
import type { MonthsExpense } from "@/models/dashboard"

export const description = "A bar chart"

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
//   { month: "July", desktop: 336 },
//   { month: "August", desktop: 120 },
//   { month: "September", desktop: 255 },
//   { month: "October", desktop: 300 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

export function DashboardMonthsChart( {monthsExpense}: {monthsExpense: MonthsExpense[]} ) {

    return (
        <Card className="bg-[var(--background)]">
        <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
            <CardDescription>January - December</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={monthsExpense}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month_name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                 <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="total" fill="var(--color-desktop)" radius={8} />
            </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
            Showing total expenses for each month
            </div>
        </CardFooter>
        </Card>
    )
}
