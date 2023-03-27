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

interface EditorAppBarProps {
  addRectC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addHexC?: (event: React.MouseEvent<HTMLButtonElement>) => void
  addTrianC?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const EditorAppBar = ({ addRectC, addHexC, addTrianC }: EditorAppBarProps) => {
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
                <div style={{ backgroundColor: '#9E9E9E' }}>
                  <IconButton aria-label="delete">
                    <HighlightAltSharpIcon fontSize="large" color="action" />
                  </IconButton>
                </div>
              ) : text === 'MoveDownOutlinedIcon' ? (
                <div style={{ backgroundColor: '#9E9E9E' }}>
                  <IconButton aria-label="delete">
                    <MoveDownOutlinedIcon fontSize="large" color="action" />
                  </IconButton>
                </div>
              ) : (
                <div style={{ backgroundColor: '#9E9E9E' }}>
                  <IconButton aria-label="delete">
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
                    <IconButton aria-label="delete" onClick={addTrianC}>
                      <ChangeHistoryIcon fontSize="large" color="action" />
                    </IconButton>
                  </div>
                ) : text === 'SquareOutlinedIcon' ? (
                  <div style={{ backgroundColor: '#9E9E9E' }}>
                    <IconButton aria-label="delete" onClick={addRectC}>
                      <SquareOutlinedIcon fontSize="large" color="action" />
                    </IconButton>
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#9E9E9E' }}>
                    <IconButton aria-label="delete" onClick={addHexC}>
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
