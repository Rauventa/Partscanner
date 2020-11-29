import React, {useState} from 'react';
import {Button, Input, Select} from "antd";
import {defaultColumns, defaultConditions} from "../../../../moq/moq";

export const PrimaryFilterField = (props: any) => {

    const { Option } = Select;

    const [field, setField] = useState(props.item.field);
    const [condition, setCondition] = useState(props.item.condition);
    const [value, setValue] = useState(props.item.value);

    const deleteFieldHandler = () => {
        props.onDelete(props.id)
    };

    console.log(value)

  return (
      <div className="filter__item_main">
          <div className="filter__item_place">
              <p className={'input-label'}>
                  Поле фильтра
              </p>
              <Select value={field} onChange={(value) => setField(value)}>
                  {defaultColumns.map((option, index) => {
                      return (
                          <Option value={option.value} key={index}>{option.name}</Option>
                      )
                  })}
              </Select>
          </div>

          <div className="filter__item_place">
              <p className={'input-label'}>
                  Условие
              </p>
              <Select value={condition} onChange={(value) => setCondition(value)}>
                  {defaultConditions.map((option, index) => {
                      return (
                          <Option value={option.value} key={index}>{option.name}</Option>
                      )
                  })}
              </Select>
          </div>

          <div className="filter__item_place">
              <p className={'input-label'}>
                  Значение
              </p>
              <Input value={value} onChange={(e) => setValue(e.target.value)} />
          </div>

          <div className="filter__item_place">
              <Button className={'ant-btn-secondary'} onClick={deleteFieldHandler}>
                  <i className={'fa fa-minus'} />
              </Button>
          </div>
      </div>
  )
};