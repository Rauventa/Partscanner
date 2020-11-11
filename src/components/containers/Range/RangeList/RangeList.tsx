import React from 'react';
import {useHistory} from "react-router-dom";
import { Button } from 'antd';

export const RangeList = () => {

    const history = useHistory();

  return (
      <div className={'RangeList'}>
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
          </div>
      </div>
  )
};