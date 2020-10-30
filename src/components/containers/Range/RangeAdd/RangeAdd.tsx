import React, {useState} from 'react';
import {Input} from "antd";
import {useHistory} from "react-router-dom";

export const RangeAdd = (props: any) => {

    const history = useHistory();

    return (
        <div className={'RangeAdd'}>

            <div className="RangeAdd__heading">
                <h1>
                    <span className={'fas fa-arrow-left'} onClick={history.goBack} />
                    Создание поставщика
                </h1>
            </div>

            <div className="RangeAdd__name">
                <p className={'input-label'}>
                    Название поставщика
                </p>
                <Input placeholder="Название" defaultValue={'Europarts'} />
            </div>
        </div>
    )
};