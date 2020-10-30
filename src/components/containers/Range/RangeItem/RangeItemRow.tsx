import React, {useEffect, useState} from 'react';
import {Col, Input, Row, Select} from "antd";

export const RangeItemRow = (props: any) => {

    const [selectValue, setSelectValue] = useState('');

    useEffect(() => {
        if(props.rowId === props.checkRow) {
            setSelectValue('')
        }
    }, [props.rowId, props.checkRow]);

    const { Option } = Select;

    const columnHandler = (value: any) => {
        //@ts-ignore
        setSelectValue(props.rowId[value]);
        props.onColumnHandler(value, props.item.name, props.index, props.rowId);
    };

    const deleteHandler = () => {
        setSelectValue('');
        props.onColumnHandler('', props.item.name, props.index, props.rowId);
    };

    return (
        <>
            <Row key={props.index} justify="center">
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Input
                        //@ts-ignore
                        placeholder={props.item.name}
                        disabled
                    />
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="RangeItem__columns_content-icon">
                        <i className={'fas fa-equals'}/>
                    </div>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Select
                        value={selectValue === '' ? 'Не выбрано' : selectValue}
                        onChange={(value) => columnHandler(value)}
                    >
                        {Object.entries(props.rowId).map(item =>
                            item[0] !== 'number' ?
                                <>
                                    <Option
                                        //@ts-ignore
                                        key={item[0]}
                                        //@ts-ignore
                                        value={item[0]}
                                    >
                                        <>
                                            {item[1]}
                                        </>
                                    </Option>
                                </>
                                : null
                        )}
                    </Select>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="RangeItem__columns_content-icon">
                        <i className={'fas fa-times'} onClick={deleteHandler}/>
                    </div>
                </Col>
            </Row>
        </>
    )
};