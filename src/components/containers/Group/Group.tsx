import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Input, Progress, Tabs, Table, Row, Col, Select} from "antd";
import { Header } from '../../UI/Header/Header';
import search from "../../../assets/images/Table/fields/search.svg";
import warning from "../../../assets/images/warning.png";
import filter from "../../../assets/images/Table/fields/filter.svg";
import {defaultGroups, defaultColumns, defaultConditions} from "../../../moq/moq";
import {PrimaryFilter} from "./Primary/PrimaryFilter";

export const Group = () => {

    //  State

    const [filters, setFilters] = useState(false);
    const [primary, setPrimary] = useState([[
        {
            field: 'Производитель',
            condition: 'Не содержит',
            value: 'Камаз'
        }
    ]]);

    //  Constants

    const history = useHistory();

    const { Option } = Select;

    const { TabPane } = Tabs;

    const header = {
    heading: 'Группа',
    buttons: [
        {
            type: 'btn-grey-light',
            text: 'Удалить'
        },
        {
            type: 'btn-blue-light',
            text: 'Сохранить как XLS'
        },
        {
            type: 'btn-blue-light',
            text: 'Дублировать'
        },
        {
            type: 'primary',
            text: 'Сохранить'
        },
    ]
  };

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Производитель',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Каталожный номер',
            dataIndex: 'catalogNumber',
            key: 'catalogNumber',
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Артикул',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'Цена, руб.',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Наличие, шт.',
            dataIndex: 'count',
            key: 'count',
        },
    ];

    //  Methods

    const filtersSwitcher = () => {
      setFilters(!filters)
    };

    const addPrimaryFilter = () => {
        const newPrimary = [...primary];

        newPrimary.push([
            {
                field: '',
                condition: '',
                value: ''
            }
        ]);

        setPrimary(newPrimary);
    };

    const deletePrimary = (id: any) => {

        //TODO написать нормальное удаление (Пока работает криво и удаляет не то, что нужно)
        const newPrimary = [...primary];

        console.log(primary)

        newPrimary.splice(id, 1);

        console.log(newPrimary)

        setPrimary(newPrimary)
    };

    return (
      <div className={'Group'}>
          <Header data={header}/>
          <div className="Group__name">
              <p className={'input-label'}>
                  Название
              </p>
              <Input
                  placeholder="Название"
                  defaultValue={'Тозмоза'}
              />
          </div>
          <div className="Group__info">
              <h3 className={'text-dark'}>Сгруппировано по фильтрам:</h3>
              <div className="Group__info_content">
                  <div className="Group__info_content-item">
                      <p className={'small-input-label'}>Всего позиций</p>
                      <p className={'heading-black-md-big'}>13990</p>
                  </div>
                  <div className="Group__info_content-item">
                      <p className={'small-input-light'}>Охват ассортимента</p>
                      <p className={'heading-black-md-big'}>30%</p>
                      <Progress percent={30} showInfo={false} />
                      <p className={'stats-text'}>
                          12333
                          <span>из</span>
                          &nbsp;
                          {defaultGroups.data.length}
                      </p>
                  </div>
                  <div className="Group__info_content-item">
                      <p className={'small-input-label'}>Уникальных позиций</p>
                      <p className={'heading-black-md-big'}>1380</p>
                  </div>
                  <div className="Group__info_content-item">
                      <p className={'small-input-light'}>Охват ассортимента</p>
                      <p className={'heading-black-md-big'}>15%</p>
                      <Progress percent={15} showInfo={false} />
                      <p className={'stats-text'}>1380 <span>из</span> 25222</p>
                  </div>
              </div>
          </div>
          <div className="Group__filters">
              <div className="Group__filters_heading">
                  <img src={filter} alt={filter} />
                  <h1>Фильтры</h1>
                  {filters ?
                      <i className="fas fa-chevron-up" onClick={filtersSwitcher}/> :
                      <i className="fas fa-chevron-down" onClick={filtersSwitcher}/>
                  }
              </div>
              <div className="Group__filters_data">
                  <div className="Group__filters_data-heading">
                      <p>Параметры фильтров:</p>
                  </div>
                  <div className="Group__filters_data-info">
                      <div className="Group__filters_data-info--column">
                          <div className="data-item">
                              <p>Основных фильтров</p>
                              <p>{primary.length}</p>
                          </div>
                          <div className="data-item">
                              <p>Уточняющих фильтров</p>
                              <p>1</p>
                          </div>
                      </div>
                      <div className="Group__filters_data-info--column">
                          <div className="data-item">
                              <p>Полей</p>
                              <p>22</p>
                          </div>
                          <div className="data-item">
                              <p>Условий</p>
                              <p>22</p>
                          </div>
                      </div>
                      <div className="Group__filters_data-info--column">
                          <div className="data-item">
                              <p>Позиций</p>
                              <p>
                                  <b>13191</b>
                              </p>
                          </div>
                      </div>
                      <div className="Group__filters_data-info--column">
                          <Button className={'btn-grey-light'}>Сбросить</Button>
                      </div>
                  </div>
              </div>
          </div>
          {filters ?
              <div className="Group__data">
                  <div className="Group__data_saved">

                  </div>
                  <div className="Group__data_primary">
                      <p className={'primary-filter-text'}>Основные фильтры</p>

                      {primary.length !== 0 ?
                        primary.map((item, index) => {
                            return (
                                <PrimaryFilter
                                    key={index}
                                    id={index}
                                    //@ts-ignore
                                    item={item}
                                    onDelete={deletePrimary}
                                />
                            )
                        }) : null
                      }
                      <div className="filter">
                          <div className="filter__heading">
                              <p>
                                  <b>{primary.length}</b>
                              </p>

                              <div className="filter__heading_extra">
                                  <p>
                                      Фильтр
                                      <span>"ИЛИ"</span>
                                  </p>

                                  <Button type={'primary'} onClick={addPrimaryFilter}>
                                      <i className={'fa fa-plus'}/>
                                  </Button>
                              </div>
                              {/*<Button></Button>*/}
                          </div>
                      </div>
                  </div>
                  <div className="Group__data_secondary">
                      <p className={'secondary-filter-text'}>
                          Уточняющие фильтры.
                          <span>Применяются к результатам основных фильтров</span>
                      </p>

                      <div className="filter">
                          <i className={'fa fa-times'}/>

                          <div className="filter__heading">
                              <p>
                                  <b>Г</b>
                              </p>
                          </div>

                          <div className="filter__item">

                              <div className="filter__item_main">
                                  <div className="filter__item_place">
                                      <p className={'input-label'}>
                                          Поле фильтра
                                      </p>
                                      <Select defaultValue="lucy">
                                          <Option value="jack">Jack</Option>
                                          <Option value="lucy">Lucy</Option>
                                          <Option value="disabled" disabled>
                                              Disabled
                                          </Option>
                                          <Option value="Yiminghe">yiminghe</Option>
                                      </Select>
                                  </div>

                                  <div className="filter__item_place">
                                      <p className={'input-label'}>
                                          Условие
                                      </p>
                                      <Select defaultValue="lucy">
                                          <Option value="jack">Jack</Option>
                                          <Option value="lucy">Lucy</Option>
                                          <Option value="disabled" disabled>
                                              Disabled
                                          </Option>
                                          <Option value="Yiminghe">yiminghe</Option>
                                      </Select>
                                  </div>

                                  <div className="filter__item_place">
                                      <p className={'input-label'}>
                                          Значение
                                      </p>
                                      <Input />
                                  </div>

                                  <div className="filter__item_place">
                                      <Button className={'ant-btn-secondary'}>
                                          <i className={'fa fa-minus'}/>
                                      </Button>
                                  </div>
                              </div>
                              <div className="filter__item_extra">
                                  <div className="filter__item_extra-item">
                                      <p className={'extra-text'}>
                                          Фильтр
                                          <span>"И"</span>
                                      </p>
                                  </div>
                                  <div className="filter__item_extra-item">
                                      <Button type={'primary'}>
                                          <i className={'fa fa-plus'}/>
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="filter">
                          <div className="filter__heading">
                              <p>
                                  <b>Д</b>
                              </p>

                              <div className="filter__heading_extra">
                                  <p>
                                      Фильтр
                                      <span>"ИЛИ"</span>
                                  </p>

                                  <Button type={'primary'}>
                                      <i className={'fa fa-plus'}/>
                                  </Button>
                              </div>
                              {/*<Button></Button>*/}
                          </div>
                      </div>
                  </div>
                  <div className="Group__data_info">
                      <p>
                          Отфильтровано позиций:
                          <span>5883</span>
                      </p>
                      <div className="Group__data_info-buttons">
                          <div className="buttons-block">
                              <Button type={'primary'}>Применить фильтры</Button>
                          </div>
                          <div className="buttons-block">
                              <Button className={'ant-btn-secondary'}>Отменить изменения</Button>
                              <p>
                                  Вернуться к последнему
                                  <br/>
                                  применению фильтров
                              </p>
                          </div>
                          <div className="buttons-block">
                              <Button className={'btn-grey-light '}>Сбросить</Button>
                          </div>
                      </div>
                  </div>
                  <div className="Group__data_hide">
                      <i className="fas fa-chevron-up" onClick={filtersSwitcher}/>
                  </div>
              </div>
              : null
          }
          <div className="Group__table">
              <div className="Group__table_actions">
                  <div className="Group__table_actions-item">
                      <p className={'heading-grey-md'}>Отображение</p>

                      <Tabs defaultActiveKey="2">
                          <TabPane tab="Сейчас в группе 10000" key="1">
                              <Table
                                  //@ts-ignore
                                  dataSource={defaultGroups.data}
                                  columns={columns}
                              />
                          </TabPane>
                          <TabPane tab={`Все позиции ${defaultGroups.data.length}`} key="2">
                              <Table
                                  //@ts-ignore
                                  dataSource={defaultGroups.data}
                                  columns={columns}
                              />
                          </TabPane>
                      </Tabs>

                  </div>
                  {/*<div className="Group__table_actions-item">*/}
                  {/*    <Input placeholder="Поиск" prefix={ <img src={search} alt={search} /> }/>*/}
                  {/*</div>*/}
              </div>
          </div>
          <div className="Group__footer">
              <Row justify="space-between">
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <div className="Group__footer_data">
                          <div className="Group__footer_data-text">
                              <p className={'footer-heading'}>
                                  <span className={'heading-black-md-big'}>Группа</span>
                                  Тормоза
                                  <span
                                      className="far fa-edit"
                                  />
                              </p>
                              <p className={'footer-groups'}>
                                  Сгруппировано по фильтрам
                                  <span className={'heading-black-md-big'}>4555</span>
                                  из
                                  &nbsp;
                                  {defaultGroups.data.length}
                                  &nbsp;
                                  позиций
                              </p>
                          </div>
                          <div className="Group__footer_data-buttons">
                              <Button className={'ant-btn-secondary'}>
                                  <i className={'fa fa-plus'}/>
                                  Новая группа
                              </Button>
                              <Button className={'ant-btn-secondary'}>Дублировать</Button>
                              <Button className={'btn-grey-light'}>Сбросить</Button>
                          </div>
                      </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <div className="Group__footer_banner">
                          <div className="Group__footer_banner-warning">
                              <div className="Group__footer_banner-warning--data">
                                  <img src={warning} alt="warning"/>
                                  <div className={'warning-text'}>
                                      <p>
                                          Фильтры были изменены
                                      </p>
                                      <p className={'warning-grey'}>
                                          Отображение не соответствует измененным фильтрам.
                                          <br/>
                                          Требуется применить фильтры.
                                      </p>
                                  </div>
                              </div>
                              <div className="Group__footer_banner-warning--buttons">
                                  <Button className={'ant-btn-secondary'}>Применить фильтр</Button>
                                  <Button className={'btn-grey-light'}>Отменить изменения</Button>
                              </div>
                          </div>
                          <div className={'Group__footer_banner-buttons'}>
                              <Button type={'primary'}>Сохранить</Button>
                              <Button type={'primary'}>Сохранить и закрыть</Button>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>
      </div>
  )
};