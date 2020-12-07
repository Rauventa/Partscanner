import React, {useState, useEffect} from 'react';
import {Button, Input, Select} from "antd";
import {defaultColumns, defaultConditions, defaultGroups} from "../../../../moq/moq";
import { connect } from 'react-redux';
import { renderFilters } from '../../../../store/actions/Group/groupActions';
import _ from 'underscore';
import {log} from "util";

const PrimaryFilterField = (props: any) => {

    const { Option } = Select;

    const [field, setField] = useState('');
    const [condition, setCondition] = useState('');
    const [value, setValue] = useState('');
    const [data, setData] = useState({
        field: '',
        condition: '',
        value: ''
    });
    
    useEffect(() => {
        setField(props.item.field);
        setCondition(props.item.condition);
        setValue(props.item.value);
    }, [props.item.condition, props.item.field, props.item.value]);
    
    useEffect(() => {
        if ((field === 'Производитель') && (condition === 'Точно равен справочнику') && (value.length !== 0)) {
            const data = defaultGroups.data.filter(item => value.includes(item.customer));
            props.renderFilters(data, 'exact', props.id, props.parentId)
        } else if ((field === 'Производитель') && (condition === 'Точно не равен справочнику') && (value.length !== 0)) {
            const data = defaultGroups.data.filter(item => !value.includes(item.customer));
            props.renderFilters(data, 'no-exact', props.id, props.parentId)
        } else if ((field === 'Каталожный номер') && (condition === 'Содержит') && (value !== '')) {
            //@ts-ignore
            const data = defaultGroups.data.filter(item => {
                return item.catalogNumber.toString().toLowerCase().includes(value.toString().toLowerCase())
            });

            props.renderFilters(data, 'includes-catalog', props.id, props.parentId)
        } else if ((field === 'Каталожный номер') && (condition === 'Не содержит') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return !item.catalogNumber.toString().toLowerCase().includes(value.toString().toLowerCase())
            });

            props.renderFilters(data, 'no-includes-catalog', props.id, props.parentId)
        } else if ((field === 'Каталожный номер') && (condition === 'Начинается с') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return item.catalogNumber.toString().toLowerCase().startsWith(value.toString().toLowerCase())
            });

            props.renderFilters(data, 'start', props.id, props.parentId)
        } else if ((field === 'Каталожный номер') && (condition === 'Не начинается с') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return !item.catalogNumber.toString().toLowerCase().startsWith(value.toString().toLowerCase())
            });

            props.renderFilters(data, 'no-start', props.id, props.parentId)
        } else if ((field === 'Каталожный номер') && (condition === 'Заканчивается на') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return item.catalogNumber.toString().toLowerCase().endsWith(value.toString().toLowerCase())
            });

            props.renderFilters(data, 'ends', props.id, props.parentId)
        } else if ((field === 'Каталожный номер') && (condition === 'Не заканчивается на') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return !item.catalogNumber.toString().toLowerCase().endsWith(value.toString().toLowerCase())
            });

            props.renderFilters(data, 'no-ends', props.id, props.parentId)
        } else if ((field === 'Цена закупки, руб') && (condition === 'Меньше чем') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return item.price < Number(value)
            });

            props.renderFilters(data, 'less', props.id, props.parentId);
        } else if ((field === 'Цена закупки, руб') && (condition === 'Больше чем') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return item.price > Number(value)
            });

            props.renderFilters(data, 'more', props.id, props.parentId)
        } else if ((field === 'Наличие, шт.') && (condition === 'Между') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return (item.count > Number(value[0])) && (item.count < Number(value[1]))
            });

            props.renderFilters(data, 'between', props.id, props.parentId)
        } else if ((field === 'Наличие, шт.') && (condition === 'Кроме') && (value !== '')) {
            const data = defaultGroups.data.filter(item => {
                return !((item.count > Number(value[0])) && (item.count < Number(value[1])))
            });

            props.renderFilters(data, 'besides', props.id, props.parentId)
        }
        // else if ((field === 'Цена закупки, руб') && (condition === 'Между') && (value !== '')) {
        //     const data = defaultGroups.data.filter(item => {
        //         return
        //     })
        // }
        
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
            const item = value;

            //@ts-ignore
            setValue(item);

            const newData = {
                field: data.field,
                condition: data.condition,
                value: item[0]
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

    const changeFirstValueHandler = (option: any) => {
        //@ts-ignore
        const filtered = [...value];

        filtered.splice(0, 1, option);

        //@ts-ignore
        setValue(filtered)
    };

    const changeSecondValueHandler = (option: any) => {
        //@ts-ignore
        const filtered = [...value];

        filtered.splice(1, 1, option);

        //@ts-ignore
        setValue(filtered)
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
                      <Input suffix="шт" type={'number'} onChange={e => changeFirstValueHandler(e.target.value)}/>
                      <h1>-</h1>
                      <Input suffix="шт" type={'number'} onChange={e => changeSecondValueHandler(e.target.value)}/>
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

function mapStateToProps(state: any) {
    return {
        filtered: state.groupReducer.filtered
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        renderFilters: (filtered: any, option: any, filterId: any, filterParentId: any) => dispatch(renderFilters(filtered, option, filterId, filterParentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryFilterField);