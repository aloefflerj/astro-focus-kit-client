import { ResponsiveContainer, PieChart, Pie, PieLabel, Cell } from 'recharts';

export function Chart({
    data,
    colors = [],
    titleContent,
}: {
    data?: any[] | undefined;
    colors?: string[];
    titleContent: string | undefined;
}) {
    const outlineColor = '#464651';

    const defaultChartColors = [
        '#6A6A89',
        '#7483d0',
        '#AAB3E1',
        '#D5D9EC',
        '#f09a82',
        '#F1B08B',
        '#E8CDAE',
        '#F0C8AC',
        '#94CEA7',
        '#B5DCC2',
        '#85C69A',
        '#659875',
        '#6A6A89',
        '#7483d0',
        '#AAB3E1',
        '#D5D9EC',
        '#f09a82',
        '#F1B08B',
        '#E8CDAE',
        '#F0C8AC',
        '#94CEA7',
        '#B5DCC2',
        '#85C69A',
        '#659875',
    ];

    const selectedColors: string[] =
        colors.length > 0 ? colors : defaultChartColors;

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
                fill={outlineColor}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
            >
                {data?.[index]?.name} ({value})%
            </text>
        );
    };

    return (
        <ResponsiveContainer width={"90%"} height={350}>
            <PieChart
                margin={{ top: 20, bottom: 20 }}
                title={titleContent !== undefined ? titleContent : ''}
            >
                <text
                    x='0'
                    y='0'
                    dominantBaseline='hanging'
                    fontSize='20'
                    fontWeight='bold'
                    fill={outlineColor}
                    style={{ position: 'fixed' }}
                >
                    {titleContent}
                </text>
                <Pie
                    innerRadius={50}
                    paddingAngle={5}
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={true}
                    outerRadius={105}
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
                    {data?.map((_, index) => (
                            <Cell
                                key={index}
                                fill={
                                    selectedColors[
                                        index % selectedColors.length
                                    ]
                                }
                                stroke={outlineColor}
                            />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
