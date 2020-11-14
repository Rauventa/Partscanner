import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Col, Input, Row, Table, Progress, Switch, Modal} from 'antd';
import filter from "../../../../assets/images/Table/fields/filter.svg";
import search from "../../../../assets/images/Table/fields/search.svg";
import {rangeList} from "../../../../moq/moq";
import moment from 'moment';
import excel from '../../../../assets/images/Table/excel.png'
import csv from '../../../../assets/images/Table/csv.png'

export const RangeList = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [actual, setActual] = useState([]);
    const [old, setOld] = useState([]);
    const [classes, setClasses] = useState(['RangeList__table_container']);
    const [modal, setModal] = useState(false);
    const [currentModal, setCurrentModal] = useState({});

    const history = useHistory();

    const rowSelection = {
        //@ts-ignore
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
        }
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
            align: 'center'
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
            width: '37%',
            //@ts-ignore
            render: (value, record) => (
                <div className={'table-supplier'}>
                    <p className={'stats-bold'}>{value}</p>
                    <p className={'table-supplier__time'}>Сейчас</p>
                </div>
            )
        },
        {
            title: 'Включен',
            dataIndex: 'isOn',
            key: 'isOn',
            align: 'center',
            width: '13%',
            //@ts-ignore
            render: (value, record) => (
                record.isOnLock ?
                    <div className={'table-ison'}>
                        <i className="fas fa-lock"/>
                        <Switch defaultChecked={value} disabled />
                    </div>
                    :
                    <div className={'table-ison'}>
                        <i className="fas fa-unlock"/>
                        <Switch defaultChecked={value} />
                    </div>
            )
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

                // const newActual = [...actual];
                // const newOld = [...old];
                //
                // if (valid) {
                //     //@ts-ignore
                //     newOld.push('1');
                //
                //     setOld(newOld)
                // } else {
                //     //@ts-ignore
                //     newActual.push('1');
                //
                //     setActual(newActual)
                // }

                // const newClasses = [...classes];
                //
                // if (valid) {
                //     newClasses.splice(1, 1, 'danger')
                // } else {
                //     newClasses.splice(1, 1, 'success')
                // }

                return (
                    !valid ?
                        <div className={'time-table'}>
                            <p className={'time-valid'}>Актуален</p>
                            <p>
                                <span>{diffDuration.days()}</span>д
                                <span>{diffDuration.hours()}</span>ч
                                <span>{diffDuration.minutes()}</span>м
                            </p>
                        </div>
                        :
                        <div className={'time-table'}>
                            <p className={'time-invalid'}>Истек</p>
                            <p>
                                <span>{expiration.days()}</span>д
                                <span>{expiration.hours()}</span>ч
                                <span>{expiration.minutes()}</span>м
                            </p>
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
            title: 'Колличество позиций',
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
                          <Row justify="space-between">
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Всего</p>
                                  <p>{rangeList.length}</p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Включено</p>
                                  <p>{rangeList.filter(item => item.isOn).length}</p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Выключено</p>
                                  <p className={'text-danger'}>{rangeList.filter(item => !item.isOn).length}</p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Актуальных</p>
                                  <p>
                                      {actual.length}
                                  </p>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <p className={'stats-heading'}>Устарело</p>
                                  <p className={'text-danger'}>
                                      {old.length}
                                  </p>
                              </Col>
                          </Row>
                      </div>
                  </Col>
                  <Col xs={2} sm={4} md={6} lg={6} xl={6}>
                      <div className="RangeList__stats_actual">
                          <Progress type="circle" percent={Math.floor((actualPositions*100)/allPositions)} width={50} />
                          <div>
                              <p className={'stats-heading'}>Актуальность позиций</p>
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
                              <p className={'stats-heading'}>Всего позиций</p>
                              <p className={'stats-bold'}>{allPositions}</p>
                          </div>
                          <div className="RangeList__stats_data-uniq">
                              <p className={'stats-heading'}>Уникальных позиций</p>
                              <p className={'stats-bold'}>1500</p>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>

          <div className="RangeList__filters">
              <Input placeholder="Фильтр" prefix={ <img src={filter} alt={filter} /> } />
              <Input placeholder="Поиск" prefix={ <img src={search} alt={search} /> } />
          </div>

          <div className="RangeList__table">
              <div className={classes.join(' ')}>
                  <Table
                      dataSource={rangeList}
                      //@ts-ignore
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
              </div>

              <div className="RangeList__table_stats">
                  <p>Всего поставщиков</p>
                  <p className={'p-stats'}>{rangeList.length}</p>
              </div>
          </div>

          <div className="RangeList__footer">
              {selectedRows.length !== 0 ?
                  <div className="RangeList__footer_stats">
                      <p>Выбрано</p>
                      <p className={'p-stats'}>
                          {selectedRows.length}
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