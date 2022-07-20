import { Button, Image, Input, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getPage, getTagPage, IImg, ITag } from "../api";
import { useAntdTable } from "ahooks";
import { ColumnsType } from "antd/lib/table";
import { ImgModal } from "../ImgModal";
import { Form } from "antd";

const getCoverUrl = (img: IImg) => `/${img.dirPath}/cover.${img.suffix}`;

const ImagePrev: React.FC<{ img: IImg }> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Image
        width={120}
        src={getCoverUrl(props.img)}
        preview={{ visible: false }}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          {new Array(props.img.count).fill(1).map((_, i) => (
            <Image
              key={i}
              src={`/${props.img.dirPath}/${i + 1}.${props.img.suffix}`}
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

function ImageViewer() {
  const [selectId, setSelectId] = useState(0);
  const [form] = Form.useForm();
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    getTagPage({ page: 1, size: 300 }).then((res) => {
      setTags(res.data);
    });
  }, []);
  const { tableProps, search } = useAntdTable(
    (e) =>
      getPage({
        page: e.current,
        size: e.pageSize,
        ...form.getFieldsValue(),
      }).then((res) => {
        console.log(form.getFieldsValue());
        return {
          list: res.data,
          total: res.total,
        };
      }),
    { form }
  );

  const { submit } = search;

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Form.Item name="name">
          <Input.Search
            placeholder="enter name"
            style={{ width: 240 }}
            onSearch={submit}
          />
        </Form.Item>
        <Form.Item name="tag">
          <Select style={{ width: 240 }} onSearch={submit}>
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.tag}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={submit}>搜索</Button>
        </Form.Item>
      </Form>
    </div>
  );

  const columns: ColumnsType<IImg> = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "大小",
      dataIndex: "count",
    },
    {
      title: "标签",
      dataIndex: "meta.tags",
      render: (_, row) => (
        <span>
          {row.meta.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: "预览",
      dataIndex: "cover",
      render: (_, row) => <ImagePrev img={row} />,
    },
    {
      title: "操作",
      dataIndex: "actions",
      render: (_, row) => (
        <span>
          <Button onClick={() => setSelectId(+row.id)}>查看</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="App">
      {searchForm}
      <Table columns={columns} {...tableProps} rowKey="id" />
      <ImgModal
        id={selectId}
        onClose={() => {
          setSelectId(0);
        }}
      />
    </div>
  );
}

export default ImageViewer;
