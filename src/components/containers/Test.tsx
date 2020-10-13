import React, {useState} from 'react';
import { Table, Radio, Divider } from 'antd';

export const Test = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            //@ts-ignore
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
    ];

    const rowSelections = {
        //@ts-ignore
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    return (
        <div className={'Test'}>
            <Table
                //@ts-ignore
                rowSelection={{
                    ...rowSelections,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
};