import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



function Dashboard() {
  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    requestPets()
  }, [])


  async function requestPets() {
    try {
      const req = await fetch('https://dummyjson.com/products')
      const res = await req.json();
      setProducts(res.products)
    } catch (e) {
      console.log(e)
    }

  }


  const getBrandData = products.reduce((acc, product) => {
    const existingBrand = acc.find(item => item.name === product.brand);

    if (existingBrand) {
      existingBrand.value += 1;
    } else {
      acc.push({ name: product.brand, value: 1 });
    }

    return acc;

  }, [])

  const getCategoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find(item => item.name === product.category);

    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }

    return acc;

  }, [])


  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const sy = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
    const mx = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
    const my = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);
    const ex = mx + (mx > cx ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = mx > cx ? 'start' : 'end';

    const dataEntry = getCategoryData?.[index];
    if (!dataEntry) {
      return null;
    }

    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="black" fill="none" />
        <circle cx={ex} cy={ey} r={2} fill="black" stroke="none" />
        <text x={ex + (mx > cx ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${dataEntry.name}: `}
          {`${(percent * 100).toFixed(0)}%`}

        </text>
      </g>
    );
  };

  const renderCustomizedLabelForBrands = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const sy = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
    const mx = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
    const my = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);
    const ex = mx + (mx > cx ? 1 : -1) * 22;
    const ey = my
    const textAnchor = mx > cx ? 'start' : 'end';

    const dataEntry = getBrandData?.[index];
    if (!dataEntry) {
      return null;
    }

    const text = `${dataEntry.name}: ${(percent * 100).toFixed(0)}%`;
    const words = text.split(' ');
    const maxLineLength = 15;
    let lines = [];
    let currentLine = [];

    words.forEach(word => {
      if (currentLine.join(' ').length + word.length <= maxLineLength) {
        currentLine.push(word);
      } else {
        lines.push(currentLine.join(' '));
        currentLine = [word];
      }
    });
    lines.push(currentLine.join(' '));

    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="black" fill="none" />
        <circle cx={ex} cy={ey} r={2} fill="black" stroke="none" />
        <text x={ex + (mx > cx ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
          {lines.map((line, i) => (
            <tspan key={i} x={ex + (mx > cx ? 1 : -1) * 12} dy={i === 0 ? 0 : 16}>
              {line}
            </tspan>
          ))}

        </text>
      </g>
    );
  };


  return (
    <div className='flex flex-col w-[90%]  mx-auto items-start'>
      <button
        onClick={() => router.back()}
        className='cursor-pointer flex  mt-16'
      >
        <img src="../../back_icon.svg" alt='backicon' /> Products
      </button>
      <div className='flex flex-wrap gap-x-6 sm:flex-col md:flex-row sm:items-center justify-center mt-8 gap-y-4'>
        <div className='w-full sm:w-auto md:w-auto rounded-2xl  bg-grey-650'>
          <h2 className='m-5'>Category</h2>
          <PieChart width={600} height={400} className="mx-auto sm:w-full md:w-auto">
            <Pie
              data={getCategoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {getCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

          </PieChart>

        </div>

        <div className='w-full sm:w-auto md:w-auto bg-grey-650 rounded-2xl'>
          <h2 className='m-5'>Brand</h2>
          <PieChart width={600} height={400}>
            <Pie
              data={getBrandData.slice(0, 8)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabelForBrands}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {getBrandData.slice(0, 8).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;