import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import {Input, Select, Row, Col, Radio, Table, Button, Checkbox, Modal} from "antd";

import excel from '../../../assets/images/Table/excel.png'
import csv from '../../../assets/images/Table/csv.png'
import { moqHeads, defaultColumns } from '../../../moq/moq';
import { RangeItemRow } from './RangeItemRow';
import search from "../../../assets/images/Table/fields/search.svg";
import correct from "../../../assets/images/correct.svg";

// @ts-ignore
export const RangeItem = (props) => {

    const [rowId, setRowId] = useState({});
    const [pool, setPool] = useState([]);
    const [column, setColumn] = useState([]);
    const [tableColumn, setTableColumn] = useState([]);
    const [modal, setModal] = useState(false);
    const [stroke, setStroke] = useState(false);
    const [selectRow, setSelectRow] = useState({});
    const [changeRow, setChangeRow] = useState({});

    //radio

    const [separator, setSeparator] = useState(1);
    const [encoding, setEncoding] = useState(1);
    const [fraction, setFraction] = useState(1);

    useEffect(() => {
        if(changeRow === selectRow) return;

        setChangeRow(selectRow)
    },[changeRow, selectRow]);


    const history = useHistory();
    const location = useLocation();

    const closeModal = () => {
      setModal(false)
    };

    const showModal = () => {
        setModal(true)
    };

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

    const reWriteSelect = () => {
      setSelectRow(rowId);
        setTableColumn([])
    };

    const columnHandler = (value: any, name: any, index: any, row: any) => {

        const newRow = {...row};

        delete newRow[value];

        setSelectRow(newRow);

        const newColumn = [...column];

        const hello = newColumn.filter(item =>
            //@ts-ignore
            item.title === name
        );

        hello.splice(0 ,1 ,
                {
                    //@ts-ignore
                    title: name,
                    //@ts-ignore
                    dataIndex: value,
                    //@ts-ignore
                    key: value
                }
            );

        const tableColumns = [...tableColumn];

        tableColumns.push(hello[0]);

        setTableColumn(tableColumns)

    };

    const onCLickRow = (record: any) => {
        return {
            onClick: () => {
                setRowId(record);
                setSelectRow(record);
                setChangeRow(record);

                const newPool = moqHeads.filter(item =>
                    item.number !== record.number
                );

                const poolData = newPool.map((item, index) => {
                    return {
                        key: index,
                        id: index + 1,
                        a: item.a,
                        b: item.b,
                        c: item.c,
                        d: item.d,
                        e: item.e,
                        f: item.f,
                    }
                });

                //@ts-ignore
                setPool(poolData);

                const newColumn = Object.entries(record).map(item => {
                    return {
                        title: item[1],
                        dataIndex: item[0],
                        key: item[0]
                    }
                });

                newColumn.splice(0, 1,
                    //@ts-ignore
                    {
                        title: '№',
                        dataIndex: 'id',
                        key: 'id'
                    }
                    );

                //@ts-ignore
                setColumn(newColumn)
            }
        }
    };

    const setRowClassName = (record: any) => {
       // @ts-ignore
       return record.number === rowId.number ? 'selectedRow' : ''
    };

    return (
        <div className={'RangeItem'}>

            <Modal
                visible={modal}
                //@ts-ignore
                onOk={closeModal}
                //@ts-ignore
                onCancel={closeModal}
                footer={[
                    <Button className={'btn-grey-light'} onClick={closeModal}>Отменить</Button>,
                    <Button className={'btn-blue-light'} onClick={closeModal}>Применить настройки без сохранения шаблона</Button>
                ]}
            >
                <div className="modal-content">
                    <h1>Сохранение шаблона соответствия столбцов</h1>
                    <p>
                        Чтобы повторно использовать настройки файла
                        <br/>
                        при обновлении данного прайс-листа, вы можете сохранить шаблон.
                    </p>
                </div>
                <div className="modal-moq">
                    <p className={'input-label'}>
                        Название шаблона
                    </p>
                    <Input placeholder="Название" defaultValue={'Шаблон'} />
                </div>
                <Button type={'primary'} onClick={closeModal}>Применить настройки и сохранить шаблон</Button>
            </Modal>

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
                <Select defaultValue="cars">
                    <Option value="cars">Cars</Option>
                    <Option value="shops">Shops</Option>
                    <Option value="items">Items</Option>
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
                        <Row justify={'space-between'}>
                            <Col xs={24} sm={24} md={8} lg={5} xl={5}>
                                <div className="select-list">
                                    <p className={'input-label'}>Тип разделителя</p>
                                    <div className="select-list__container">
                                        <Radio.Group value={separator} onChange={e => setSeparator(e.target.value)}>
                                            <Radio value={1}>;</Radio>
                                            <Radio value={2}>табуляция</Radio>
                                            <Radio value={3}>пробел</Radio>
                                            <Radio value={4}>,</Radio>
                                            <Radio value={5} className={'custom-radio'}>
                                                другое
                                                <Input placeholder="$" defaultValue={'$'} />
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={5} xl={5}>
                                <div className="select-list">
                                    <p className={'input-label'}>Кодировка</p>
                                    <div className="select-list__container">
                                        <Radio.Group value={encoding} onChange={e => setEncoding(e.target.value)}>
                                            <Radio value={1}>UTF-8</Radio>
                                            <Radio value={2}>UTF-16</Radio>
                                            <Radio value={3}>Windows-1251</Radio>
                                            <Radio value={4}>KOI8-R</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={5} xl={5}>
                                <div className="select-list">
                                    <p className={'input-label'}>Разделитель целой и дробной части</p>
                                    <div className="select-list__container">
                                        <Radio.Group value={fraction} onChange={e => setFraction(e.target.value)}>
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
                    <Checkbox onChange={e => setStroke(e.target.checked)}>Нет строки с заголовками</Checkbox>
                    {stroke ?
                        <p>Выберите первую строку с данными</p> :
                        <p>Выберите строку с заголовками столбцов (шапку таблицы)</p>
                    }
                </div>
                <Table
                    dataSource={moqHeads}
                    // @ts-ignore
                    columns={columns}
                    // @ts-ignore
                    onRow={record => onCLickRow(record)}
                    // @ts-ignore
                    rowClassName={record => setRowClassName(record)}
                    pagination={false}
                />
                <div className="RangeItem__pool_static">
                    {Object.keys(rowId).length !== 0 ?
                        <>
                            <p>
                                Выбрана строка
                                <span> №{
                                    //@ts-ignore
                                    rowId.number
                                }</span>
                            </p>
                            <Button type={'primary'} disabled>Сбросить строку</Button>
                        </>
                        : null
                    }
                </div>
            </div>

            {Object.keys(rowId).length !== 0 ?
                <div className="RangeItem__columns">
                    <div className="RangeItem__columns_heading">
                        <h1>Cоответствие столбцов</h1>
                        <p>Установите соответствие заголовков столбцов базы данных и файла</p>
                    </div>
                    <div className="RangeItem__columns_content">
                        <Row justify="center">
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <h2>Заголовок столбца в базе данных</h2>
                            </Col>
                            <Col xs={1} sm={1} md={1} lg={1} xl={1}/>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <h2>Заголовок столбца в файле</h2>
                            </Col>
                        </Row>
                        {defaultColumns.map((item, index) => {
                            return (
                                <RangeItemRow
                                    //@ts-ignore
                                    index={index}
                                    rowId={selectRow}
                                    checkRow={rowId}
                                    item={item}
                                    onColumnHandler={columnHandler}
                                />
                            )
                        })}
                        <Row justify="center">
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}/>
                            <Col xs={1} sm={1} md={1} lg={1} xl={1}/>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} className={'button-col'}>
                                <Button
                                    type={'primary'}
                                    //@ts-ignore
                                    onClick={reWriteSelect}
                                >
                                    Сбросить столбцы
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                : null
            }

            {pool.length !== 0 ?
                <div className="RangeItem__correct">
                    <div className="RangeItem__correct_is">
                        <img src={correct} alt={correct}/>
                        <p>Проверка</p>
                    </div>
                    <div className="RangeItem__correct_heading">
                        <Row justify="space-between">
                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                <p>Проверьте правильность расстановки столбцов</p>
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                <Input placeholder="Поиск" prefix={ <img src={search} alt={search} /> } />
                            </Col>
                        </Row>
                    </div>
                    <Table
                        dataSource={pool}
                        columns={tableColumn}
                        pagination={{
                            //@ts-ignore
                            position: ["bottomLeft"],
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50']
                        }}
                    />
                    <p>
                        Всего позиций {pool.length}
                    </p>
                </div>
                : null
            }

            {pool.length !== 0 ?
                <div className="RangeItem__check">
                    <Checkbox>Подтверждаю, что проверил правильность соответствия столбцов</Checkbox>
                    <div className="RangeItem__check_buttons">
                        <div className="RangeItem__check_buttons-first">
                            <Button type={'primary'}>Применить настройки файла</Button>
                            <Button
                                className={'ant-btn-secondary'}
                                //@ts-ignore
                                onClick={showModal}
                            >
                                Сохранить шаблон cоответствия столбцов
                            </Button>
                        </div>
                        <Button type={'primary'} disabled>Сбросить настройки</Button>
                    </div>
                </div>
                : null
            }
        </div>
    )
};