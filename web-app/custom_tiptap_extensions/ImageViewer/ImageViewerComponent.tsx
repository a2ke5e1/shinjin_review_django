import {NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import {Tweet} from 'react-twitter-widgets'
import {ImageList, ImageListItem, useMediaQuery} from "@mui/material";
import {ImageProps} from "./ImageViewer";

// @ts-ignore
// eslint-disable-next-line react/display-name
export default props => {


  const artwork: Array<ImageProps> = props.node.attrs.src

  let imageListCol = 3;


  const isWidth900 = useMediaQuery('(max-width: 900px)');
  const isWidth400 = useMediaQuery('(max-width: 400px)');

  if (isWidth900) {
    imageListCol = 2;
  }

  if (isWidth400) {
    imageListCol = 1;
  }

  return (
    <NodeViewWrapper draggable="true" data-drag-handle="" className="image-viewer-embed">
      <ImageList cols={imageListCol} sx={{p: 0}}>
        {
          artwork.map((item) => (
            <ImageListItem key={item.alt}>
              <img
                src={`${item.url}`}
                srcSet={`${item.url}`}
                alt={item.alt}
                loading="lazy"
              />
            </ImageListItem>
          ))
        }
      </ImageList>
    </NodeViewWrapper>
  )
}