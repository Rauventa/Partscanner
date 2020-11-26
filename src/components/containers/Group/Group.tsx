import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Input, Progress, Tabs, Table} from "antd";
import { Header } from '../../UI/Header/Header';
import search from "../../../assets/images/Table/fields/search.svg";

export const Group = () => {

  const history = useHistory();

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

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];


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
                      <p className={'stats-text'}>12333 <span>из</span> 30000</p>
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
              <h1>Фильтры</h1>
          </div>
          <div className="Group__table">
              <div className="Group__table_actions">
                  <div className="Group__table_actions-item">
                      <p className={'heading-grey-md'}>Отображение</p>

                      <Tabs defaultActiveKey="1">
                          <TabPane tab="Сейчас в группе 10000" key="1">
                              <Table dataSource={dataSource} columns={columns} />
                          </TabPane>
                          <TabPane tab="Все позиции 23330" key="2">
                              <Table dataSource={dataSource} columns={columns} />
                          </TabPane>
                      </Tabs>

                  </div>
                  {/*<div className="Group__table_actions-item">*/}
                  {/*    <Input placeholder="Поиск" prefix={ <img src={search} alt={search} /> }/>*/}
                  {/*</div>*/}
              </div>
          </div>
          <div className="Group__footer">

          </div>
      </div>
  )
};