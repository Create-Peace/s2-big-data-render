import React from 'react';
import { SheetComponent } from '@antv/s2-react';
import type { S2DataConfig } from '@antv/s2';
import '@antv/s2-react/dist/s2-react.min.css';

// Generate sample data with 700 rows and 6 columns
const generateData = () => {
  const data = [];
  
  for (let i = 1; i <= 700; i++) {
    data.push({
      id: i,
      name: `Employee ${i}`,
      age: Math.floor(Math.random() * 30) + 20,
      city: ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'][Math.floor(Math.random() * 5)],
      salary: Math.floor(Math.random() * 50000) + 50000,
      department: ['IT', 'HR', 'Finance', 'Marketing', 'Sales'][Math.floor(Math.random() * 5)]
    });
  }
  return data;
};

const DataTable: React.FC = () => {
  const data = generateData();
  console.log(data);

  const s2DataConfig: S2DataConfig = {
    fields: {
      columns: ['name', 'age', 'city', 'salary', 'department'],
      values: [],
    },
    data,
    meta: [
      {
        field: 'salary',
        name: 'Salary',
        formatter: (value: any) => `$${Number(value).toLocaleString()}`,
      },
      {
        field: 'age',
        name: 'Age',
        formatter: (value: any) => `${value} years`,
      },
    ],
  };

  const s2Options = {
    width: 1200,
    height: 800,
    seriesNumber: {
      enable: true,
    },
   /*  pagination: {
      pageSize: 50,
      current: 1,
    }, */
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Data Table</h1>
      <SheetComponent
        sheetType="table"
        dataCfg={s2DataConfig}
        options={s2Options}
      />
    </div>
  );
};

export default DataTable; 