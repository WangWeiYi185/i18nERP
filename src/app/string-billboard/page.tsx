'use client';

import React, { useState } from "react";
import { SheetComponent } from '@antv/s2-react';
import { PivotSheet, ViewMeta } from "@antv/s2";
import { Button ,Flex } from 'antd';
import '@antv/s2-react/dist/style.min.css';



// 1. 准备数据
const data = [
    {
      Key: "Login",
      Translate: "登陆",
      Comment: "登陆页面按钮",
      Base: "login",
      English: "login",
      Indonesia: "Gabung",
    },
    {
      Key: "Confrim",
      Translate: "确认",
      Comment: "登陆页面确认",
      Base: "confrim",
      English: "confrim", 
      Indonesia: "mengonfirmasi",
    },
  ];
  



function Page() {
  const [edits, setEdits] = useState<Array<ViewMeta>>([]);

  // 2. 配置数据
  const s2DataConfig = {
    fields: {
      columns: ["Key", "Translate", "Comment", "Base", "English", "Indonesia"], // 要展示的列头字段 id 列表
    },
    meta: [
      // 列头字段对应的元信息，比如展示的中文名
      {
        field: "Key",
        name: "Key",
      },
      {
        field: "Translate", 
        name: "Translate(中英)",
      },
      { 
        field: "Comment",
        name: "注释",
      },
      {
        field: "Base",
        name: "默认(en)",
      },
      {
        field: "English",
        name: "英语(en)",
      },
      {
      field: "Indonesia",
      name: "印尼语(id)",
      },
    ],
    data,
  };
    
  // 3. 添加配置
  const s2Options = {
    width: 1000,
    height: 200,
    showSeriesNumber: true,

    // 通过配置 修改数值 实现字段标记 
    conditions: {
      text: [
        {
          field: "price",
          mapping(fieldValue: any, data: any) {
            console.log( fieldValue, data)
            return {
              // 修改过的标记用于指定文本颜色
              fill: "#5B8FF9",
            };
          },
        },
      ],
      background: [],
      interval: [],
      icon: []
    },
  };





  
  return <> 
    <Button type="primary" size="large" >
        保存
    </Button>
    <Button type="primary" size="large" >
        倒入
    </Button>
    <Button type="primary" size="large" >
        导出
    </Button>
    <SheetComponent
      sheetType="editable"
      dataCfg={s2DataConfig}
      options={s2Options}
      onDataCellEditEnd={(meta:ViewMeta) => {
        console.log('onDataCellEditEnd', meta);
        setEdits((prevEdits) => [...prevEdits, meta]);
        // 记录修改，保存时倒入数据库
      }}
      
    />
  </>
  

  //return <h1>Hello, Dashboard Page!</h1>
 
}

export default Page;

  
