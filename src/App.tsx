import { Button, Image, Table } from 'antd';
import React, { useState } from 'react';
import { getPage, IImg } from './api';
import { useAntdTable } from 'ahooks'
import { ColumnsType } from 'antd/lib/table';
import { ImgModal } from './ImgModal';

const getCoverUrl = (img: IImg) => `/${img.dirPath}/cover.${img.suffix}`

const ImagePrev: React.FC<{ img: IImg }> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Image
        width={120}
        src={getCoverUrl(props.img)}
        preview={{visible: false}}
        onClick={() => setVisible(true)}
        
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {
            new Array(props.img.count).fill(1).map((_, i) => <Image key={i} src={`/${props.img.dirPath}/${i+1}.${props.img.suffix}`} />)
          }
          
        </Image.PreviewGroup>
      </div>
    </>
  );
}

function App() {
  const [selectId, setSelectId] = useState(0)
  const { tableProps } = useAntdTable((e) => getPage({ page: e.current, size: e.pageSize }).then(res => {
    return {
      list: res.data,
      total: res.total
    }
  }))


  const columns: ColumnsType<IImg> = [{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '大小',
    dataIndex: 'count'
  }, {
    title: "标签",
    dataIndex: 'meta.tags',
    render: (_, row) => (<span>{row.meta.tags.join(',')}</span>)
  }, {
    title: "预览",
    dataIndex: "cover",
    render: (_, row) => ( <ImagePrev img={row} /> )
  },{
    title: "操作",
    dataIndex: "actions",
    render: (_, row) => (
      <span>
        <Button onClick={() => setSelectId(+row.id)}>查看</Button>
      </span>
    )
  }]

  return (
    <div className="App">
      <Table columns={columns}  {...tableProps} rowKey="id" />
      <ImgModal id={selectId} onClose={() => {setSelectId(0)}} />
    </div>
  );
}

export default App;
