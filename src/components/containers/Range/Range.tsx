import React, {useState} from 'react';
import {Select, Switch, Radio, InputNumber, Upload, message, Button, Table, Row, Col, Input} from 'antd';
import {useHistory} from 'react-router-dom';
import {moqArray} from "../../../moq/moq";
import cloud from '../../../assets/images/cloud.svg';

import search from '../../../assets/images/Table/fields/search.svg';
import filter from '../../../assets/images/Table/fields/filter.svg';

import excel from '../../../assets/images/Table/excel.png'
import csv from '../../../assets/images/Table/csv.png'
import { NavLink } from 'react-router-dom';

export const Range = () => {

    const [title, setTitle] = useState('Europarts');
    const [valid, setValid] = useState(false);
    const [radio, setRadio] = useState(1);
    const [counter, setCounter] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [summary, setSummary] = useState([]);

    const history = useHistory();

    const { Option } = Select;
    const { Dragger } = Upload;

    const rowSelection = {
        //@ts-ignore
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
        },
    };

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            sortDirections: ['descend', 'ascend'],
            //@ts-ignore
            render: (value, record) => (
                record.format === '.xls' ?
                    <div className={'table-name'}>
                        <img src={excel} alt={excel}/>
                        <p>{record.name}</p>
                    </div>
                    :
                    <div className={'table-name'}>
                        <img src={csv} alt={csv}/>
                        <p>{record.name}</p>
                    </div>
            ),
            //@ts-ignore
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Дата загрузки',
            dataIndex: 'date',
            key: 'date',
            sortDirections: ['descend', 'ascend'],
            //@ts-ignore
            sorter: (a, b) => a.date.localeCompare(b.date),
            //@ts-ignore
            render: date =>
                <p>{new Date(date).toLocaleDateString()}</p>
        },
        {
            title: 'Размер',
            dataIndex: 'size',
            key: 'size',
            width: '10%',
            sortDirections: ['descend', 'ascend'],
            //@ts-ignore
            sorter: (a, b) => a.size - b.size,
            //@ts-ignore
            render: item => <p className={'list-title'}>{item + ' kb'}</p>
        },
        {
            title: 'Включен в ассортимент',
            dataIndex: 'list',
            key: 'list',
            width: '5%',
            align: 'center',
            //@ts-ignore
            render: item =>
                item ? <p className={'primary-text'}>Да</p> : <p>Нет</p>
        },
        {
            title: 'Настройка столбцов',
            dataIndex: 'settings',
            key: 'settings',
            align: 'center',
            //@ts-ignore
            render: item =>
                item ? <p>Настроены</p> : <p className={'text-danger'}>Не настроены</p>
        },
        {
            title: 'Количество позиций',
            dataIndex: 'count',
            key: 'count',
            width: '5%',
            align: 'center',
            //@ts-ignore
            render: item =>
                (item !== 0) ? <p>{item}</p> : <p>-</p>
        },
        {
            title: 'Настройка',
            dataIndex: 'set',
            key: 'set',
            align: 'center',
            //@ts-ignore
            render: (value, record) => (
                record.settings ?
                <Button type="primary" className={'table-btn'} disabled>Настроить</Button> :
                    <Button type="primary" className={'table-btn'} onClick={() => redirectHandler(record)}>Настроить</Button>
            )
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            width: '5%',
            align: 'center',
            //@ts-ignore
            render: (value, record) => (
                <a href="#">
                    <span className={'fa fa-trash list-title'}/>
                </a>
            )
        },
    ];

    const settingsValue =
        selectedRows.filter(item =>
            //@ts-ignore
            item.settings === false
        ).length;

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //@ts-ignore
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const redirectHandler = (item: any) => {
        history.push(`/${item.key}`, {item: item})
    };

    return (
        <div className="Range">

            <div className="Range__heading">
                <h1>Ассортимент поставщика</h1>
            </div>

            {moqArray.filter(item => item.supplier === title).map(item => {
                // @ts-ignore
                return (
                    //@ts-ignore
                    <React.Fragment key={item}>
                        <div className="Range__supplier">

                            <p className={'input-label'}>
                                Поставщик
                            </p>

                            <Select defaultValue={item.supplier} onChange={value => setTitle(value)}>
                                {moqArray.map(item => {
                                    return (
                                        <Option value={item.supplier}>{item.supplier}</Option>
                                    )
                                })}
                            </Select>

                        </div>

                        <div className="Range__info">

                            <div className="Range__info_heading">
                                <h1>
                                    {item.supplier}
                                    <span
                                        className="far fa-edit"
                                    />
                                </h1>
                            </div>

                            <div className="Range__info_list">
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        Адрес
                                    </p>
                                    <p className={'list-value'}>
                                        {item.address}
                                    </p>
                                </div>
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        Контактное лицо
                                    </p>
                                    <p className={'list-value'}>
                                        {item.person}
                                    </p>
                                </div>
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        Телефон
                                    </p>
                                    <p className={'list-value'}>
                                        {item.phone}
                                    </p>
                                </div>
                                <div className="Range__info_list-field">
                                    <p className={'list-title'}>
                                        E-mail
                                    </p>
                                    <p className={'list-value'}>
                                        {item.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="Range__stock">
                            <div className="Range__stock_heading">
                                <h1>Ассортимент</h1>
                            </div>

                            <div className="Range__stock_type">
                                <p className={'input-label'}>
                                    Тип данных
                                </p>
                                <p>{item.dataType}</p>
                            </div>

                            <div className="Range__stock_content">
                                <Row justify="space-between">
                                    <Col xs={2} sm={4} md={12} lg={12} xl={12}>
                                        <div className="Range__stock_content-files">
                                            <p className={'input-label'}>
                                                Загрузка файлов ассортимента
                                            </p>

                                            <Dragger {...props}>
                                                <p className="ant-upload-drag-icon">
                                                    <img src={cloud} alt=""/>
                                                </p>
                                                <h2>Загрузите прайс-листы поставщика</h2>
                                                <p className="ant-upload-text">Выберите или перетащите файлы на вашем компьютере</p>
                                                <p className="ant-upload-hint">
                                                    Файлы в формате: xlsx, csv
                                                </p>
                                            </Dragger>
                                        </div>
                                    </Col>
                                    <Col xs={2} sm={4} md={12} lg={12} xl={12}>
                                        <div className="Range__stock_content-valid">
                                            <p className={'input-label'}>
                                                Срок годности ассортимента
                                            </p>

                                            <div className="validContent">
                                                <div className="validContent__checker">
                                                    <Switch defaultChecked={valid} onChange={() => setValid(!valid)} />
                                                    <p>Срок годности ассортимента</p>
                                                </div>

                                                {valid ?
                                                    <div className={'validContent__content'}>
                                                        <Radio.Group onChange={event => setRadio(event.target.value)} value={radio}>
                                                            <Radio value={1}>день</Radio>
                                                            <Radio value={2}>неделя</Radio>
                                                            <Radio value={3}>месяц</Radio>
                                                        </Radio.Group>
                                                        <div className={'validContent__content_time'}>
                                                            {counter > 1 ?
                                                                <>
                                                                    <button onClick={() => setCounter(counter - 1)}>-</button>
                                                                    <InputNumber
                                                                        value={counter}
                                                                        //@ts-ignore
                                                                        onChange={value => setCounter(value)}
                                                                    />
                                                                    <button onClick={() => setCounter(counter + 1)}>+</button>
                                                                </> :
                                                                <>
                                                                    <button disabled>-</button>
                                                                    <InputNumber
                                                                        value={counter}
                                                                        //@ts-ignore
                                                                        onChange={value => setCounter(value)}
                                                                    />
                                                                    <button onClick={() => setCounter(counter + 1)}>+</button>
                                                                </>
                                                            }
                                                            <Select defaultValue="lucy">
                                                                <Option value="jack">Jack</Option>
                                                                <Option value="lucy">Lucy</Option>
                                                                <Option value="Yiminghe">yiminghe</Option>
                                                            </Select>

                                                            <Select defaultValue="lucy">
                                                                <Option value="jack">Jack</Option>
                                                                <Option value="lucy">Lucy</Option>
                                                                <Option value="Yiminghe">yiminghe</Option>
                                                            </Select>
                                                        </div>
                                                        <div className={'validContent__content_info'}>
                                                            <div className="validContent__content_info-date">
                                                                <p className={'small-input-label'}>
                                                                    Будет повторяться каждую неделю в следующие дни:
                                                                    <br/>
                                                                    пн, ср, пт, вс
                                                                </p>
                                                            </div>
                                                            <div className="validContent__content_info-time">
                                                                <p>до 11 мая 2020</p>
                                                                <h2>
                                                                    <span>1</span> д
                                                                    <span> 16</span> ч
                                                                    <span> 36</span> м
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="Range__stock_statistic">
                                <div className="Range__stock_statistic-heading">
                                    <h3 className={'post-title'}>
                                        Статистика ассортимента
                                    </h3>
                                </div>

                                <div className="Range__stock_statistic-list">
                                    <div className="Range__stock_statistic-list--item">
                                        <p className={'small-input-label'}>Дата установки</p>
                                        <p>{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="Range__stock_statistic-list--item">
                                        <p className={'small-input-label'}>Файлов</p>
                                        <p>{item.docs.length}</p>
                                    </div>
                                    <div className="Range__stock_statistic-list--item">
                                        <p className={'small-input-label'}>Всего позиций</p>
                                        <p>{item.docs.reduce((a,b) =>
                                            //@ts-ignore
                                            a + b.count,
                                            0
                                        )}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="Range__files">
                            <h2 className={'heading-grey-md'}>Файлы ассортимента</h2>
                            <div className="Range__files_filters">
                                <Input placeholder="Фильтр" prefix={ <img src={filter} alt={filter} /> } />
                                <Input placeholder="Поиск" prefix={ <img src={search} alt={search} /> } />
                            </div>
                            <div className="Range__files_add">
                                <Button type={'primary'}>
                                    <i className={'fa fa-plus'}/>
                                </Button>
                                <p>Загрузить файл</p>
                            </div>
                            <Table
                                dataSource={item.docs}
                                // @ts-ignore
                                summary={(currentData) => setSummary(currentData)}
                                // @ts-ignore
                                columns={columns}
                                rowSelection={{
                                    ...rowSelection,
                                }}
                                //@ts-ignore
                                pagination={{
                                    //@ts-ignore
                                    position: ["bottomLeft"],
                                    defaultPageSize: 5,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['5', '10', '20', '50']
                                }}
                            />
                            <div className="Range__files_statistic">
                                <p>Всего файлов &nbsp; {summary.length}</p>
                                <p>
                                    Всего позиций &nbsp;
                                    {summary.reduce((a,b) =>
                                        //@ts-ignore
                                        a + b.count,
                                        0
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="Range__land">
                            <div className="Range__land_info">
                                <div className="Range__land_info-heading">
                                    <h2 className={'heading-black-md-big'}>Установка ассортимента</h2>
                                    <p>Выберите файлы текущего ассортимента поставщика</p>
                                </div>
                                <div className="Range__land_info-content">
                                    <p>
                                        Выбрано файлов
                                        <span>{selectedRows.length}</span>
                                    </p>

                                    {settingsValue !== 0 ?
                                        <p className={'text-danger'}>
                                            Требуют настройки
                                            <span>{settingsValue}</span>
                                        </p> : null
                                    }

                                    <p>
                                        Количество позиций
                                        {selectedRows.length !== 0 ?
                                            <span>{selectedRows.reduce((a, b) =>
                                                //@ts-ignore
                                                a + b.count, 0
                                            )}</span> :
                                            <span>0</span>
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="Range__land_button">
                                {selectedRows.length !== 0 ?
                                    <Button type={'primary'}>Установка ассортимента</Button> :
                                    <Button type={'primary'} disabled>Установка ассортимента</Button>
                                }
                            </div>
                        </div>

                        <div className="Range__buttons">
                            <Button type={'primary'}>Сохранить</Button>
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
};