import React, { useState, useEffect, useRef } from 'react';
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
  const [tableWidth, setTableWidth] = useState(window.innerWidth - 80);
  const [key, setKey] = useState(0); // 用于强制重新渲染表格
  const s2Ref = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      // 销毁旧的表格实例
      if (s2Ref.current) {
        s2Ref.current.destroy();
      }
      setTableWidth(window.innerWidth - 80);
      setKey(prev => prev + 1); // 强制重新渲染表格
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // 组件卸载时销毁表格实例
      if (s2Ref.current) {
        s2Ref.current.destroy();
      }
    };
  }, []);

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
    width: tableWidth,
    height: 600,
    seriesNumber: {
      enable: true,
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <SheetComponent
        key={key}
        ref={s2Ref}
        sheetType="table"
        dataCfg={s2DataConfig}
        options={s2Options}
      />
    </div>
  );
};

export default DataTable; 