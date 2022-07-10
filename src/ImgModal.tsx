import { Modal, Spin } from "antd";
import { count } from "console";
import { useEffect, useMemo, useState } from "react";
import { getDetails, IImg } from "./api";

export interface IImgModalProps {
  id?: string|number;
  onClose: () => void
}

export const ImgModal: React.FC<IImgModalProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState<IImg|null>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0)
    if (props.id) {
      setVisible(true)
      getDetails(props.id).then(setDetails)
    } else {
      setVisible(false)
      setDetails(null)
    }
  },[props.id])
  const url = useMemo(() => {
    if (details) {
      return `/${details.dirPath}/${index + 1}.${details.suffix}` 
    } else {
      return ""
    }
  }, [details, index])

  const handleClick = () => {
    if (details && index < details.count - 1) {
      setIndex(index+1)
    } else {
      props.onClose()
    }
  }

  return (
    <div>
      <Modal title="预览" visible={visible} width={1200} footer={null} onCancel={props.onClose}>
        { details === null ? <Spin /> :  <img src={url} alt={url} onClick={handleClick} />}
      </Modal>
    </div>
  )
}