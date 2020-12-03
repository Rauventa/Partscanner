import React, {useState, useEffect} from 'react';
import {Button, Input, Select} from "antd";
import {defaultColumns, defaultConditions, defaultGroups} from "../../../../moq/moq";

export const PrimaryFilterField = (props: any) => {

    const { Option } = Select;

    const [field, setField] = useState('');
    const [condition, setCondition] = useState('');
    const [value, setValue] = useState('');
    const [data, setData] = useState({
        field: '',
        condition: '',
        value: ''
    });
    const [filtered, setFiltered] = useState([]);
    
    useEffect(() => {
        setField(props.item.field);
        setCondition(props.item.condition);
        setValue(props.item.value);
    }, [props.item.condition, props.item.field, props.item.value]);
    
    useEffect(() => {
        if ((field === 'Производитель') && (condition === 'Точно равен справочнику') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return item.customer === value
            });

            const newFiltered = [...filtered];

            //@ts-ignore
            const summary = newFiltered.concat(data);

            setFiltered(summary);
        } else if ((field === 'Производитель') && (condition === 'Точно не равен справочнику') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return item.customer !== value
            });

            const newFiltered = [...filtered];

            //@ts-ignore
            const summary = newFiltered.concat(data);

            setFiltered(summary);
        }
        
    }, [condition, field, value]);

    const stringCondition = [
        {
            name: 'Точно равен справочнику',
            value: 'exact',
            color: 'blue'
        },
        {
            name: 'Точно не равен справочнику',
            value: 'exact-no',
            color: 'red'
        }
    ];

    const numberCondition = [
        {
            name: 'Меньше чем',
            value: 'less',
            color: 'blue'
        },
        {
            name: 'Больше чем',
            value: 'more',
            color: 'red'
        },
        {
            name: 'Между',
            value: 'between',
            color: 'blue'
        },
        {
            name: 'Кроме',
            value: 'besides',
            color: 'red'
        }
    ];

    const changeFieldHandler = (value: any) => {
        const item = defaultColumns.filter(item => item.value === value).map(item => {
            return item.name
        });

        setField(item[0]);

        const newData = {
            field: item[0],
            condition: data.condition,
            value: data.value
        };

        setData(newData);

        props.changeItemHandler(props.id, newData);
    };

    const changeConditionHandler = (value: any) => {

        const allConditions = defaultConditions.concat(numberCondition, stringCondition);
        const item = allConditions.filter(item => item.value === value).map(item => {
            return item.name
        });

        setCondition(item[0]);

        const newData = {
            field: data.field,
            condition: item[0],
            value: data.value
        };

        setData(newData);

        props.changeItemHandler(props.id, newData);
    };

    const changeValueHandler = (value: any) => {

        if (Array.isArray(value)) {
            const item = value[0];

            setValue(item);

            const newData = {
                field: data.field,
                condition: data.condition,
                value: item
            };

            setData(newData);

            props.changeItemHandler(props.id, newData);
        } else {
            setValue(value);

            const newData = {
                field: data.field,
                condition: data.condition,
                value: value
            };

            setData(newData);

            props.changeItemHandler(props.id, newData);
        }
    };


    const deleteFieldHandler = () => {
        props.onDelete(props.id)
    };

  return (
      <div className="filter__item_main">
          <div className="filter__item_place">
              <p className={'input-label'}>
                  Поле фильтра
              </p>
              <Select value={field} onChange={(value) => changeFieldHandler(value)}>
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
              {field === 'Производитель' ?
                  <Select value={condition} onChange={(value) => changeConditionHandler(value)}>
                      {stringCondition.map((option, index) => {
                          return (
                              <Option className={option.color} value={option.value} key={index}>{option.name}</Option>
                          )
                      })}
                  </Select>
                  : ((field === 'Каталожный номер') || (field === 'Наименование') || (field === 'Артикул')) ?
                  <Select value={condition} onChange={(value) => changeConditionHandler(value)}>
                      {defaultConditions.map((option, index) => {
                          return (
                              <Option className={option.color} value={option.value} key={index}>{option.name}</Option>
                          )
                      })}
                  </Select>
                  :
                  <Select value={condition} onChange={(value) => changeConditionHandler(value)}>
                      {numberCondition.map((option, index) => {
                          return (
                              <Option className={option.color} value={option.value} key={index}>{option.name}</Option>
                          )
                      })}
                  </Select>
              }
          </div>

          <div className="filter__item_place">
              <p className={'input-label'}>
                  Значение
              </p>
              {field === 'Производитель' ?
                  <Select mode="multiple" onChange={(value) => changeValueHandler(value)}>
                      {defaultGroups.data.map((item, index) => {
                          return (
                              <Option value={item.customer} key={index}>{item.customer}</Option>
                          )
                      })}
                  </Select>
                  : ((field === 'Каталожный номер') || (field === 'Наименование') || (field === 'Артикул')) ?
                  <Input value={value} onChange={(e) => changeValueHandler(e.target.value)} />
                  : (field === 'Цена закупки, руб') ?
                  <Input value={value} suffix="руб" type={'number'} onChange={(e) => changeValueHandler(e.target.value)}/>
                  :
                  <div className={'filter__item_place-inputs'}>
                      <Input suffix="шт" type={'number'}/>
                      <h1>-</h1>
                      <Input suffix="шт" type={'number'}/>
                  </div>
              }
          </div>

          <div className="filter__item_place">
              <Button className={'ant-btn-secondary'} onClick={deleteFieldHandler}>
                  <i className={'fa fa-minus'} />
              </Button>
          </div>
      </div>
  )
};