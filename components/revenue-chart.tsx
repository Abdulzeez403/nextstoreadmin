'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3200 },
  { name: 'Apr', total: 2800 },
  { name: 'May', total: 3600 },
  { name: 'Jun', total: 4100 },
  { name: 'Jul', total: 4500 },
  { name: 'Aug', total: 4300 },
  { name: 'Sep', total: 4800 },
  { name: 'Oct', total: 5200 },
  { name: 'Nov', total: 5600 },
  { name: 'Dec', total: 6100 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#adfa1d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

