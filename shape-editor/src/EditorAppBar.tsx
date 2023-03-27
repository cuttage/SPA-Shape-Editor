import {
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  Divider,
  IconButton,
} from '@mui/material'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import HighlightAltSharpIcon from '@mui/icons-material/HighlightAltSharp'
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined'
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectable } from './store/selectable'
import { setClickable } from './store/clickable'
import { RootState } from './store/store'

interface EditorAppBarProps {
  addRectC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addHexC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addTrianC?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const EditorAppBar = ({ addRectC, addHexC, addTrianC }: EditorAppBarProps) => {
  const selectable = useSelector(
    (state: RootState) => state.selectable.selectable
  )
  const clickable = useSelector((state: RootState) => state.clickable.clickable)
  const dispatch = useDispatch()

  const toggleSelectable = () => {
    dispatch(setSelectable(!selectable))
    if (clickable === true) {
      toggleClickable()
    }
  }

  const toggleClickable = () => {
    dispatch(setClickable(!clickable))
    if (selectable === true) {
      toggleSelectable()
    }
  }

  const buttonStyleA = {
    backgroundColor: '#9E9E9E',
    outline: selectable ? '3px solid lime' : 'none',
  }

  const buttonStyleB = {
    backgroundColor: '#9E9E9E',
    outline: clickable ? '3px solid lime' : 'none',
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: '88px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '88px',
          boxSizing: 'border-box',
        },
      }}
    >
      <div />
      <List>
        {[
          'HighlightAltSharpIcon',
          'MoveDownOutlinedIcon',
          'HeightOutlinedIcon',
        ].map((text) => (
          <ListItem key={text}>
            <ListItemIcon>
              {text === 'HighlightAltSharpIcon' ? (
                <div style={buttonStyleA}>
                  <IconButton
                    aria-label="select tool"
                    onClick={toggleSelectable}
                  >
                    <HighlightAltSharpIcon fontSize="large" color="action" />
                  </IconButton>
                </div>
              ) : text === 'MoveDownOutlinedIcon' ? (
                <div style={buttonStyleB}>
                  <IconButton aria-label="move tool" onClick={toggleClickable}>
                    <MoveDownOutlinedIcon fontSize="large" color="action" />
                  </IconButton>
                </div>
              ) : (
                <div style={{ backgroundColor: '#9E9E9E' }}>
                  <IconButton aria-label="closest point tool">
                    <HeightOutlinedIcon fontSize="large" color="action" />
                  </IconButton>
                </div>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['ChangeHistoryIcon', 'SquareOutlinedIcon', 'HexagonOutlinedIcon'].map(
          (text) => (
            <ListItem key={text}>
              <ListItemIcon>
                {text === 'ChangeHistoryIcon' ? (
                  <div style={{ backgroundColor: '#9E9E9E' }}>
                    <IconButton aria-label="triangle tool" onClick={addTrianC}>
                      <ChangeHistoryIcon fontSize="large" color="action" />
                    </IconButton>
                  </div>
                ) : text === 'SquareOutlinedIcon' ? (
                  <div style={{ backgroundColor: '#9E9E9E' }}>
                    <IconButton aria-label="rectangle tool" onClick={addRectC}>
                      <SquareOutlinedIcon fontSize="large" color="action" />
                    </IconButton>
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#9E9E9E' }}>
                    <IconButton aria-label="hexagon tool" onClick={addHexC}>
                      <HexagonOutlinedIcon fontSize="large" color="action" />
                    </IconButton>
                  </div>
                )}
              </ListItemIcon>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  )
}

export default EditorAppBar
