import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import {Input, Select, Row, Col, Radio, Table, Button, Checkbox} from "antd";

import excel from '../../../assets/images/Table/excel.png'
import csv from '../../../assets/images/Table/csv.png'
import { moqHeads, defaultColumns } from '../../../moq/moq';
import { RangeItemRow } from './RangeItemRow';

// @ts-ignore
export const RangeItem = (props) => {

    const [rowId, setRowId] = useState(moqHeads[0]);
    const [pool, setPool] = useState([]);
    const [column, setColumn] = useState([
        {
            title: 'Производитель',
            dataIndex: 'a',
            key: 'a',
        },
        {
            title: 'Каталожный номер',
            dataIndex: 'b',
            key: 'b',
        },
        {
            title: 'Наименование',
            dataIndex: 'c',
            key: 'c',
        },
        {
            title: 'Артикул',
            dataIndex: 'd',
            key: 'd',
        },
        {
            title: 'Цена закупки',
            dataIndex: 'e',
            key: 'e',
        },
        {
            title: 'Наличие, шт.',
            dataIndex: 'f',
            key: 'f',
        },
    ]);

    const history = useHistory();
    const location = useLocation();

    //@ts-ignore
    const item = location.state.item;

    const columns = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            //@ts-ignore
            render: item =>
                <p className={'blue-text'}>{item}</p>
        },
        {
            title: 'A',
            dataIndex: 'a',
            key: 'a'
        },
        {
            title: 'B',
            dataIndex: 'b',
            key: 'b'
        },
        {
            title: 'C',
            dataIndex: 'c',
            key: 'c'
        },
        {
            title: 'D',
            dataIndex: 'd',
            key: 'd'
        },
        {
            title: 'E',
            dataIndex: 'e',
            key: 'e'
        },
        {
            title: 'F',
            dataIndex: 'f',
            key: 'f'
        }
    ];

    const { Option } = Select;

    const columnHandler = (value: any, name: any, index: any) => {

        const newColumn = [...column];

        newColumn.splice(index, 1,
            //@ts-ignore
                {
                    title: name,
                    dataIndex: value,
                    key: value
                }
            );

        //@ts-ignore
        setColumn(newColumn)
    };

    const onCLickRow = (record: any) => {
        return {
            onClick: () => {
                setRowId(record);

                const newPool = moqHeads.filter(item =>
                    item.number !== record.number
                );

                const poolData = newPool.map((item, index) => {
                    return {
                        key: index,
                        a: item.a,
                        b: item.b,
                        c: item.c,
                        d: item.d,
                        e: item.e,
                        f: item.f,
                    }
                });

                //@ts-ignore
                setPool(poolData)
            }
        }
    };

    const setRowClassName = (record: any) => {
       // @ts-ignore
       return record.number === rowId.number ? 'selectedRow' : ''
    };

    return (
        <div className={'RangeItem'}>
            <div className="RangeItem__heading">
                <h1>
                    <span className={'fas fa-arrow-left'} onClick={history.goBack} />
                    Настройка файла
                </h1>
            </div>
            <div className="RangeItem__name">
                <p className={'input-label'}>
                    Название файла
                </p>
                <Input placeholder="Название" defaultValue={item.name} />
            </div>

            <div className="RangeItem__template">
                <p className={'input-label'}>
                    Шаблон настройки файла
                </p>
                <Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>

            <div className="RangeItem__type">
                <p className={'input-label'}>
                    Тип файла
                </p>
                {item.format === '.xls' ?
                    <div className="RangeItem__type_text">
                        <img src={excel} alt={excel}/>
                        <p>{item.format}</p>
                    </div>
                    :
                    <div className="RangeItem__type_text">
                        <img src={csv} alt={csv}/>
                        <p>{item.format}</p>
                    </div>
                }

                {item.format === '.csv' ?
                    <div className="RangeItem__type_select">
                        <Row>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <div className="select-list">
                                    <p className={'input-label'}>Тип разделителя</p>
                                    <div className="select-list__container">
                                        <Radio.Group value={1}>
                                            <Radio value={1}>;</Radio>
                                            <Radio value={2}>табуляция</Radio>
                                            <Radio value={3}>пробел</Radio>
                                            <Radio value={4}>,</Radio>
                                            <Radio value={5}>
                                                другое
                                                <Input placeholder="$" defaultValue={'$'} />
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <div className="select-list">
                                    <p className={'input-label'}>Кодировка</p>
                                    <div className="select-list__container">
                                        <Radio.Group value={1}>
                                            <Radio value={1}>UTF-8</Radio>
                                            <Radio value={2}>UTF-16</Radio>
                                            <Radio value={3}>Windows-1251</Radio>
                                            <Radio value={4}>KOI8-R</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <div className="select-list">
                                    <p className={'input-label'}>Разделитель целой и дробной части</p>
                                    <div className="select-list__container">
                                        <Radio.Group value={1}>
                                            <Radio value={1}>точка</Radio>
                                            <Radio value={2}>запятая</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    : null
                }
            </div>

            <div className="RangeItem__pool">
                <div className="RangeItem__pool_heading">
                    <h1>Строка с названиями столбцов</h1>
                    <p>Установите строку с названиями столбцов (шапку таблицы)</p>
                </div>
                <Table
                    dataSource={moqHeads}
                    // @ts-ignore
                    columns={columns}
                    // @ts-ignore
                    onRow={record => onCLickRow(record)}
                    // @ts-ignore
                    rowClassName={record => setRowClassName(record)}
                />
                <div className="RangeItem__pool_static">
                    {Object.keys(rowId).length !== 0 ?
                        <p>
                            Выбрана строка
                            <span> №{
                                //@ts-ignore
                                rowId.number
                            }</span>
                        </p>
                        : null
                    }
                    <Button type={'primary'} disabled>Сбросить строку</Button>
                </div>
            </div>

            <div className="RangeItem__columns">
                <div className="RangeItem__columns_heading">
                    <h1>Cоответствие столбцов</h1>
                    <p>Установите соответствие заголовков столбцов базы данных и файла</p>
                </div>
                <div className="RangeItem__columns_content">
                    {defaultColumns.map((item, index) => {
                        return (
                            <RangeItemRow
                                //@ts-ignore
                                index={index}
                                rowId={rowId}
                                item={item}
                                onColumnHandler={columnHandler}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="RangeItem__correct">
                {pool.length !== 0 ?
                    <Table dataSource={pool} columns={column} />
                    : null
                }
            </div>

            <div className="RangeItem__check">
                <Checkbox>Подтверждаю, что проверил правильность соответствия столбцов</Checkbox>
                <div className="RangeItem__check_buttons">
                    <div className="RangeItem__check_buttons-first">
                        <Button type={'primary'}>Применить настройки файла</Button>
                        <Button className={'ant-btn-secondary'}>Сохранить шаблон cоответствия столбцов</Button>
                    </div>
                    <Button type={'primary'} disabled>Сбросить настройки</Button>
                </div>
            </div>
        </div>
    )
};