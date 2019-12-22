/**
 * ### Панель параметров текущего изделия
 *
 * @module Params
 *
 * Created by Evgeniy Malyarov on 22.07.2019.
 */

import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import DataField from 'metadata-react/DataField';

export default function Params({row, inset, meta}) {
  if(!row) {
    return <Typography variant="subtitle1" color="secondary">Нет параметров, либо не выбрана строка продукции</Typography>;
  }
  const {product_params, presentation} = inset;
  const res = [<Typography key="title" variant="subtitle1" color="primary">{`Параметры ${presentation}`}</Typography>];
  const struct = new Map();
  const {elm_positions} = $p.enm;
  product_params.forEach((row) => {
    if(row.pos.empty()) return;
    if(!struct.get(row.pos)) {
      struct.set(row.pos, []);
    }
    struct.get(row.pos).push(row);
  });

  const fld_props = {
    _obj: row,
    isTabular: false,
  };

  const fprops = (v) => {
    const _fld = v.param.valueOf();
    return Object.assign({
      _fld,
      _meta: meta.fields[_fld],
      key: `f_${_fld}`,
    }, fld_props);
  };

  let frame = struct.get(elm_positions.top);
  if(frame) {
    res.push(<FormGroup key="top" row>
      {
        frame.map((v) => {
          /* eslint-disable react/jsx-key */
          return <DataField {...fprops(v)} />;
        })
      }
    </FormGroup>);
  }

  if([1,2,3].some((v) => struct.get(elm_positions[`column${v}`]))) {
    res.push(<FormGroup key="columns" row>
      {[1,2,3].map((v) => {
        const column = struct.get(elm_positions[`column${v}`]);
        if(!column) return null;
        return <FormGroup key={`column${v}`}>
          {
            column.map((v) => {
              /* eslint-disable react/jsx-key */
              return <DataField {...fprops(v)} />;
            })
          }
        </FormGroup>;
      })}
    </FormGroup>);
  }

  frame = struct.get(elm_positions.bottom);
  if(frame) {
    res.push(<FormGroup key="bottom" row>
      {
        frame.map((v) => {
          return <DataField {...fprops(v)} />;
        })
      }
    </FormGroup>);
  }

  return res;
}
