import React, {useState, useEffect} from 'react';
import {Button} from "antd";
import {PrimaryFilterField} from "./PrimaryFilterField";

export const PrimaryFilter = (props: any) => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        setData(props.item)
    }, [props.item]);

    const addFieldsHandler = () => {
      const newData = [...data];

      newData.push({
          //@ts-ignore
          field: '',
          //@ts-ignore
          condition: '',
          //@ts-ignore
          value: ''
      });

      setData(newData);
    };

    const changeItemHandler = (id: any, item: any) => {
        const newData = [...data];

        //@ts-ignore
        newData.splice(id, 1, item);

        setData(newData);

        props.changePrimaryData(props.id, newData)
    };

    const deleteFilterHandler = () => {
        props.onDelete(props.id);
    };

    const deleteField = (id: any) => {
        const newData = [...data];

        newData.splice(id, 1);

        setData(newData);
    };

  return (
      <div className="filter">
          <i className={'fa fa-times'} onClick={deleteFilterHandler}/>
          <div className="filter__heading">
              <p>
                  <b>{props.id}</b>
              </p>
              {/*<Button></Button>*/}
          </div>
          <div className="filter__item">

              {data.map((field: any, index: any) => {
                  return (
                      <PrimaryFilterField
                          key={index}
                          id={index}
                          //@ts-ignore
                          item={field}
                          onDelete={deleteField}
                          changeItemHandler={changeItemHandler}
                      />
                  )
              })}

              <div className="filter__item_extra">
                  <div className="filter__item_extra-item">
                      <p className={'extra-text'}>
                          Фильтр
                          <span>"И"</span>
                      </p>
                  </div>
                  <div className="filter__item_extra-item">
                      <Button type={'primary'} onClick={addFieldsHandler}>
                          <i className={'fa fa-plus'}/>
                      </Button>
                  </div>
              </div>
          </div>
      </div>
  )
};