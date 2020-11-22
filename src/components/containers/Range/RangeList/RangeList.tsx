import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Col, Input, Modal, Progress, Row, Select, Table, Tag} from 'antd';
import search from "../../../../assets/images/Table/fields/search.svg";
import filter from "../../../../assets/images/Table/fields/filter.svg";
import {rangeList} from "../../../../moq/moq";
import moment from 'moment';
import 'moment/locale/ru';
import excel from '../../../../assets/images/Table/excel.png'
import csv from '../../../../assets/images/Table/csv.png';
import timer from '../../../../assets/images/timer.png';
import notimer from '../../../../assets/images/notimer.png';
import {RangeListSwitcher} from "./RangeListSwitcher";

export const RangeList = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modal, setModal] = useState(false);
    const [currentModal, setCurrentModal] = useState({});
    const [term, setTerm] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [filterValue, setFilterValue] = useState('off');

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // });

    const history = useHistory();

    const { Option } = Select;

    moment.locale('ru');

    const rowSelection = {
        //@ts-ignore
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
            setSelectedRowKeys(selectedRowKeys)
        },
        selectedRowKeys,
        selections: [
            {
                key: 'clear',
                text: 'Очистить выделение',
                //@ts-ignore
                onSelect: () => {
                    setSelectedRowKeys([]);
                },
            },
            {
                key: 'page',
                text: 'Выбрать все на странице',
                //@ts-ignore
                onSelect: changableRowKeys => {
                    setSelectedRowKeys(changableRowKeys);
                },
            },
            {
                key: 'all-pages',
                text: 'Выбрать все',
                //@ts-ignore
                onSelect: () => {
                    const newRows = Object.keys(rangeList).map(item => {
                        return String(Number(item) + 1)
                    });
                    //@ts-ignore
                    setSelectedRowKeys(newRows)
                },
            },
        ]
    };

    const allPositions = rangeList.reduce((a,b) =>
                //@ts-ignore
            a + b.count,
            0
        );

    const actualPositions = rangeList.reduce((a,b) =>
            //@ts-ignore
        a + b.actual,
        0
    );

    const onPositions = rangeList.filter(item => {
        const now = moment();
        const expiration = moment(item.time);
        const diff = expiration.diff(now);
        const diffDuration = moment.duration(diff);

        const valid = diffDuration.milliseconds() < 0;

        if (item.time !== null) {
            return !valid
        }
    });

    const offPositions = rangeList.filter(item => {
        const now = moment();
        const expiration = moment(item.time);
        const diff = expiration.diff(now);
        const diffDuration = moment.duration(diff);

        return diffDuration.milliseconds() < 0
    });

    const fileColumns = [
        {
            title: 'Название / Размер',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            //@ts-ignore
            render: (value, record) => (
                record.format === '.xls' ?
                    <div className={'table-name-date'}>
                        <div className="table-name-date__image">
                            <img src={excel} alt={excel}/>
                        </div>
                        <div className="table-name-date__content">
                            <p>{value}</p>
                            <p className={'text-grey'}>{record.size}</p>
                        </div>
                    </div>
                    :
                    <div className={'table-name-date'}>
                        <div className="table-name-date__image">
                            <img src={csv} alt={csv}/>
                        </div>
                        <div className="table-name-date__content">
                            <p>{value}</p>
                            <p className={'text-grey'}>{record.size}</p>
                        </div>
                    </div>
            )
        },
        {
            title: 'Дата загрузки',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            //@ts-ignore
            render: (value, record) => {
                const days = moment(value).format('DD.MM.YYYY');
                const time = moment(value).format('HH:mm')

                return (
                    <div className={'table-time'}>
                        <p>{days}</p>
                        <p>{time}</p>
                    </div>
                )
            }
        },
        {
            title: 'Количество позиций',
            dataIndex: 'count',
            key: 'count',
            align: 'right'
        }
    ];

    const columns = [
        {
            title: 'Поставщик / Дата загрузки',
            dataIndex: 'supplier',
            key: 'supplier',
            align: 'left',
            width: '17%',
            sortDirections: ['descend', 'ascend'],
            //@ts-ignore
            sorter: (a, b) => {
                const expiration1 = moment(a.createdAt);
                const expiration2 = moment(b.createdAt);

                //@ts-ignore
                return expiration1 - expiration2
            },
            //@ts-ignore
            render: (value, record) => {
                const now = moment();
                const expiration = moment(record.createdAt);
                const diff = now.diff(expiration);
                const diffDuration = moment.duration(diff).asMinutes();

                if (diffDuration.valueOf() < 10 && diffDuration.valueOf() > 0) {
                    return (
                        <div className={'table-supplier'}>
                            <p className={'stats-bold'}>{value}</p>
                            <p className={'table-supplier__time time-now'}>Сейчас</p>
                        </div>
                    )
                } else if (diffDuration.valueOf() < 1440 && diffDuration.valueOf() > 10) {
                    return (
                        <div className={'table-supplier'}>
                            <p className={'stats-bold'}>{value}</p>
                            <p className={'table-supplier__time'}>Сегодня в {expiration.format('HH:mm')}</p>
                        </div>
                    )
                } else if (diffDuration.valueOf() < 2880 && diffDuration.valueOf() > 1440) {
                    return (
                        <div className={'table-supplier'}>
                            <p className={'stats-bold'}>{value}</p>
                            <p className={'table-supplier__time'}>Вчера в {expiration.format('HH:mm')}</p>
                        </div>
                    )
                } else {
                    return (
                        <div className={'table-supplier'}>
                            <p className={'stats-bold'}>{value}</p>
                            <p className={'table-supplier__time'}>{expiration.format('DD MMMM YYYY HH:mm')}</p>
                        </div>
                    )
                }
            }
        },
        {
            title: 'Участие в выгрузках',
            dataIndex: 'landings',
            key: 'landings',
            // align: 'center',
            //@ts-ignore
            render: landings => (
                landings ?
                <>
                    {landings.map((item: any, index: any) => {
                        return (
                            <Tag key={index} className={'landings-tags'}>
                                {item.name}
                            </Tag>
                        )
                    })}
                </> : <p className={'landings-text'}>Не находится в выгрузках</p>
            )
        },
        {
            title: 'Включен',
            dataIndex: 'isOn',
            key: 'isOn',
            align: 'center',
            width: '13%',
            //@ts-ignore
            render: (value, record) => {
                return (
                    <RangeListSwitcher
                        record={record}
                        value={value}
                    />
                )
            }
        },
        {
            title: 'Срок годности ассортимента',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
            width: '13%',
            sortDirections: ['descend', 'ascend'],
            //@ts-ignore
            render: (value, record) => {
                const now = moment();
                const expiration = moment(value);
                const diff = expiration.diff(now);
                const diffDuration = moment.duration(diff);

                const valid = diffDuration.milliseconds() < 0;

                return (
                    value === null ?
                        <div className={'time-table'}>
                            <div className="time-table__image">
                                <img src={notimer} alt="timer"/>
                            </div>

                            <div className="time-table__content">
                                <p className={'small-input-label'}>Не установлен</p>
                            </div>
                        </div>
                        : !valid ?
                        <div className={'time-table'}>
                            <div className="time-table__image">
                                <img src={timer} alt="timer"/>
                            </div>
                            <div className="time-table__content">
                                <p className={'time-valid'}>Актуален</p>
                                <p>
                                    <span>{diffDuration.days()}</span>д
                                    <span>{diffDuration.hours()}</span>ч
                                    <span>{diffDuration.minutes()}</span>м
                                </p>
                            </div>
                        </div>
                        :
                        <div className={'time-table'}>
                            <div className="time-table__image">
                                <img src={timer} alt="timer"/>
                            </div>

                            <div className="time-table__content">
                                <p className={'time-invalid'}>Истек на</p>
                                <p>
                                    <span>{Math.abs(diffDuration.days())}</span>д
                                    <span>{Math.abs(diffDuration.hours())}</span>ч
                                    <span>{Math.abs(diffDuration.minutes())}</span>м
                                </p>
                            </div>
                        </div>
                )
            },
            //@ts-ignore
            sorter: (a, b) => {
                const now = moment();
                const expiration1 = moment(a.time);
                const expiration2 = moment(b.time);
                const diff1 = expiration1.diff(now);
                const diff2 = expiration2.diff(now);
                const diffDuration1 = moment.duration(diff1);
                const diffDuration2 = moment.duration(diff2);

                //@ts-ignore
                return diffDuration1 - diffDuration2
            }
        },
        {
            title: 'Количество позиций',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
            width: '13%',
            //@ts-ignore
            render: value => (
                <div className={'table-count'}>
                    <p>{value}</p>
                </div>
            )
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            width: '13%',
            align: 'center',
            //@ts-ignore
            render: (value, record) => {
                const now = moment();
                const expiration = moment(record.time);
                const diff = expiration.diff(now);
                const diffDuration = moment.duration(diff);

                const valid = diffDuration.milliseconds() < 0;

                return (
                    <>
                        {
                            !valid ?
                                <div className={'action-buttons'}>
                                    <Button className={'ant-btn-secondary'}>
                                        Настроить
                                    </Button>
                                    <Button className={'ant-btn-secondary btn-transparent'} onClick={() => showModal(record)}>
                                        Список файлов
                                    </Button>
                                </div>
                                :
                                <div className={'action-buttons'}>
                                    <Button type={'primary'}>
                                        Настроить
                                    </Button>
                                    <Button className={'ant-btn-secondary btn-transparent'} onClick={() => showModal(record)}>
                                        Список файлов
                                    </Button>
                                </div>
                        }
                    </>
                )
            }
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            width: '5%',
            //@ts-ignore
            render: (value, record) => (
                <span className={'fa fa-trash list-title'}/>
            )
        },
    ];

    const closeModal = () => {
        setModal(false)
    };

    const showModal = (record: any) => {
        setModal(true);

        setCurrentModal(record);
    };

    const searchHandler = (e: any) => {
        setTerm(e.target.value)
    };

    const searchingFor = (term: any) => {
        return function(x: any) {
            // x.landings.filter((item: any) => item.name.toLowerCase().includes(term.toLowerCase()))
            return x.supplier.toLowerCase().includes(term.toLowerCase()) || !term
        }
    };

    const filterHandler = (value: any) => {
        if (value === 'active') {
            const filtered = rangeList.filter(item => item.isOn);
            //@ts-ignore
            setFiltered(filtered);
            setFilterValue(value)
        } else if (value === 'disabled') {
            const filtered = rangeList.filter(item => !item.isOn);
            //@ts-ignore
            setFiltered(filtered);
            setFilterValue(value)
        } else if (value === 'actual') {
            const filtered = rangeList.filter(item => {
                const now = moment();
                const expiration = moment(item.time);
                const diff = expiration.diff(now);
                const diffDuration = moment.duration(diff);

                const valid = diffDuration.milliseconds() < 0;

                if (item.time !== null) {
                    return !valid
                }
            });

            //@ts-ignore
            setFiltered(filtered);
            setFilterValue(value)
        } else if (value === 'old') {
            const filtered = rangeList.filter(item => {
                const now = moment();
                const expiration = moment(item.time);
                const diff = expiration.diff(now);
                const diffDuration = moment.duration(diff);

                return diffDuration.milliseconds() < 0
            });

            //@ts-ignore
            setFiltered(filtered);
            setFilterValue(value)
        } else {
            //@ts-ignore
            setFiltered([]);
            setFilterValue(value)
        }
    };

  return (
      <div className={'RangeList'}>

          {Object.keys(currentModal).length !== 0 ?
              <Modal
                  visible={modal}
                  //@ts-ignore
                  onOk={closeModal}
                  //@ts-ignore
                  onCancel={closeModal}
                  footer={[
                      <Button style={{display: 'none'}}>Отменить</Button>,
                      <Button style={{display: 'none'}}>Ок</Button>
                  ]}
              >
                  <div className="modal">
                      <div className={'modal__heading'}>
                          <h1 className={'heading-text'}>
                              Список файлов
                              &nbsp;
                              {
                                  //@ts-ignore
                                  currentModal.supplier
                              }
                          </h1>
                      </div>
                      <div className="modal__table">
                          <Table
                              //@ts-ignore
                              dataSource={currentModal.docs}
                              //@ts-ignore
                              columns={fileColumns}
                              pagination={false}
                          />
                      </div>

                      <div className="modal__data">
                          <p>
                              Файлов
                              &nbsp;
                              {
                                  //@ts-ignore
                                  currentModal.docs.length
                              }
                          </p>
                          <p>
                              Всего позиций
                              &nbsp;
                              {
                                  //@ts-ignore
                                  currentModal.docs.reduce((a: any,b: any) =>
                                          //@ts-ignore
                                      a + b.count,
                                      0
                                  )}
                          </p>
                      </div>
                  </div>
              </Modal> : null
          }

          <div className="heading">
              <h1>
                  <span className={'fas fa-arrow-left'} onClick={history.goBack} />
                  Список ассортиментов
              </h1>
          </div>

          <div className="RangeList__head">
              <Button type={'primary'}>
                  <i className="fas fa-plus"/>
                  &nbsp;
                  Загрузить ассортимент
              </Button>
              <Button className={'ant-btn-secondary'}>
                  Создать группу
              </Button>
          </div>

          <div className="RangeList__stats">
              <p className={'text-dark'}>Статистика поставщиков</p>
              <Row justify="space-between">
                  <Col xs={2} sm={4} md={12} lg={12} xl={12}>
                      <div className="RangeList__stats_main">
                          <Row>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Всего</p>
                                  <p onClick={() => filterHandler('off')}>{rangeList.length}</p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Включено</p>
                                  <p onClick={() => filterHandler('active')}>{rangeList.filter(item => item.isOn).length}</p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Выключено</p>
                                  <p className={'text-danger'} onClick={() => filterHandler('disabled')}>{rangeList.filter(item => !item.isOn).length}</p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Актуальных</p>
                                  <p onClick={() => filterHandler('actual')}>
                                      {onPositions.length}
                                  </p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Устарело</p>
                                  <p className={'text-danger'} onClick={() => filterHandler('old')}>
                                      {offPositions.length}
                                  </p>
                              </Col>
                          </Row>
                      </div>
                  </Col>
                  <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                      <div className="RangeList__stats_actual">
                          <Progress
                              type="circle"
                              percent={Math.floor((actualPositions*100)/allPositions)}
                              strokeColor={Math.floor((actualPositions*100)/allPositions) < 80 ? '#E01838' : Math.floor((actualPositions*100)/allPositions) < 96 ? '#F9AC69' : '#65CE5C'}
                              width={65}
                          />
                          <div>
                              <p className={'stats-heading'}>
                                  Актуальность
                                  <br/>
                                  позиций
                              </p>
                              <p>
                                  {actualPositions}
                                  <span className={'stats-heading'}>из</span>
                                  {allPositions}
                              </p>
                          </div>
                      </div>
                  </Col>
                  <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                      <div className="RangeList__stats_data">
                          <div className="RangeList__stats_data-all">
                              <p className={'stats-heading'}>
                                  Всего
                                  <br/>
                                  позиций
                              </p>
                              <p className={'stats-bold'}>{allPositions}</p>
                          </div>
                          <div className="RangeList__stats_data-uniq">
                              <p className={'stats-heading'}>
                                  Уникальных
                                  <br/>
                                  позиций
                              </p>
                              <p className={'stats-bold'}>1500</p>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>

          <div className="RangeList__filters">
              <Select value={filterValue} onChange={filterHandler} suffixIcon={<img src={filter} alt={filter} />}>
                  <Option value="off">Без фильтров</Option>
                  <Option value="active">Активен</Option>
                  <Option value="disabled">Выключен</Option>
                  <Option value="actual">Актуален</Option>
                  <Option value="old">Устарел</Option>
              </Select>
              {/*<Input placeholder="Фильтр" prefix={ <img src={filter} alt={filter} /> } />*/}
              <Input placeholder="Поиск" prefix={ <img src={search} alt={search} /> } onChange={(e) => searchHandler(e)} />
          </div>

          <div className="RangeList__table">
              <div className={'RangeList__table_container'}>
                  <Table
                      dataSource={filtered.length !== 0 ? filtered.filter(searchingFor(term)) : rangeList.filter(searchingFor(term))}
                      //@ts-ignore
                      columns={columns}
                      rowSelection={{
                          ...rowSelection,
                      }}
                      rowClassName={(record, index) => {
                          const now = moment();
                          const expiration = moment(record.time);
                          const diff = expiration.diff(now);
                          const diffDuration = moment.duration(diff);

                          const valid = diffDuration.milliseconds() < 0;

                          return record.time === null ? 'disabled' : !valid ? 'active' : 'danger'
                      }}
                      //@ts-ignore
                      pagination={{
                          //@ts-ignore
                          position: ["bottomLeft"],
                          defaultPageSize: 5,
                          showSizeChanger: true,
                          pageSizeOptions: ['5', '10', '20', '50']
                      }}
                      locale={{ emptyText: 'Ничего не найдено' }}
                  />
              </div>

              <div className="RangeList__table_stats">
                  <p>Всего поставщиков</p>
                  <p className={'p-stats'}>{rangeList.length}</p>
              </div>
          </div>

          <div className="RangeList__footer">
              {selectedRowKeys.length !== 0 ?
                  <div className="RangeList__footer_stats">
                      <p>Выбрано</p>
                      <p className={'p-stats'}>
                          {selectedRowKeys.length}
                          &nbsp;
                          из
                          &nbsp;
                          {rangeList.length}
                          &nbsp;
                          поставщиков
                      </p>
                  </div>
                  :
                  <div className={'RangeList__footer_stats'}>
                      <p>Еще ничего не выбрано</p>
                  </div>
              }
              <div className="RangeList__footer_buttons">
                  <Button className={'btn-grey-light'}>Удалить</Button>
                  <Button className={'ant-btn-secondary'}>Посмотреть ассортимент</Button>
                  <Button type={'primary'}>Создать группу товаров</Button>
              </div>
          </div>
      </div>
  )
};