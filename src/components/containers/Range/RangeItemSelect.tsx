import React, {useState, useEffect} from 'react';
import {Select} from "antd";

export const RangeItemSelect = (props: any) => {

    const [selectValue, setSelectValue] = useState(props.value);

    useEffect(() => {

        const selectData = Object.values(props.rowId) as string[];

        setSelectValue(selectData[props.index + 1]);

        console.log(selectData[props.index + 1])

    }, [props.rowId, props.index]);

    const { Option } = Select;

    return (
        <Select
            defaultValue={selectValue}
            // onChange={(value) => columnHandler(value)}
            allowClear
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
    )
};