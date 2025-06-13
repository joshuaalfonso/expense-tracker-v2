





"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

export function DashboardMonthsChart( {monthsExpense}: {monthsExpense: MonthsExpense[]} ) {

  const maxValue = Math.max(...monthsExpense.map(item => +item.total));

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
                      tickLine={true}
                      tickMargin={10}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => value.slice(0, 3)}
                  />
                   <YAxis domain={[0, maxValue + 200]} hide={false}/> 
                  <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar dataKey="total" fill="var(--color-desktop)" radius={5}/>
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
