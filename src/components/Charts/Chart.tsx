import { ResponsiveContainer, PieChart, Pie, PieLabel, Cell } from 'recharts';

export function Chart({
    data,
    colors,
    label,
    titleContent,
}: {
    data?: any[] | undefined;
    colors: string[];
    label?: PieLabel<any> | undefined;
    titleContent: JSX.Element | JSX.Element[] | string | undefined;
}) {
    const outlineColor = '#464651';

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        value,
        index,
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        value: number;
        index: number;
    }): JSX.Element => {
        const RADIAN = Math.PI / 180;
        // eslint-disable-next-line
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        // eslint-disable-next-line
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        // eslint-disable-next-line
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill='#464651'
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
            >
                {data?.[index]?.name} ({value})%
            </text>
        );
    };

    return (
        <ResponsiveContainer width='100%' height='70%'>
            <PieChart width={200} height={100} title='Most Productive Weekday'>
                <text
                    x='0'
                    y='0'
                    dominantBaseline='hanging'
                    fontSize='20'
                    fontWeight='bold'
                    fill={outlineColor}
                >
                    {titleContent}
                </text>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={true}
                    outerRadius={110}
                    label={
                        data === undefined
                            ? false
                            : data.length === 0
                            ? false
                            : renderCustomizedLabel
                    }
                    fill={outlineColor}
                    color={outlineColor}
                    dataKey='value'
                    stroke={outlineColor}
                >
                    {data?.map((entry, index) => (
                        <>
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                                stroke={outlineColor}
                            />
                        </>
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
