import React from 'react';
import {Col, Input, Row, Select} from "antd";

export const RangeItemRow = (props: any) => {


    const { Option } = Select;

    const columnHandler = (value: any) => {
        props.onColumnHandler(value, props.item.name, props.index);
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
                    <Select defaultValue={props.item.name} onChange={(value) => columnHandler(value)}>
                        {Object.entries(props.rowId).map((item) => {
                            return (
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
                            )
                        })}
                    </Select>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <div className="RangeItem__columns_content-icon">
                        <i className={'fas fa-times'}/>
                    </div>
                </Col>
            </Row>
        </>
    )
};