import { filter } from 'lodash'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import '../App.css'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
// components
import Page from '../Components/Page'
import Scrollbar from '../Components/Scrollbar'
import Iconify from '../Components/Iconify'
import SearchNotFound from '../Components/SearchNotFound'
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user'
import api from '../helper/api'
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const TABLE_HEAD = [

  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'dob', label: 'Date Of Birth', alignRight: false },
]

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    )
  }
  return stabilizedThis.map((el) => el[0])
}

export default function User() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    const data = await api('GET', '/get-all-users', {})
    setUserList(data)
  }
  useEffect(() => {
    getUsers()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName,
  )
  const handleRowClick = (e, id) => {
    e.stopPropagation()
    navigate(`/dashboard/user/${id}`)
  }
  const handleEditClick = (e, id) => {
    e.stopPropagation()
    navigate(`/edit/${id}`)
  }
  const isUserNotFound = filteredUsers.length === 0

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/register"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        gender,
                        team,
                        profile_image,
                        dob
                      } = row
                      const isItemSelected = selected.indexOf(name) !== -1

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          style={{ cursor: "pointer" }}
                          // role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={(e) => handleRowClick(e, id)}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={profile_image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{team}</TableCell>
                          <TableCell align="left">{gender}</TableCell>
                          <TableCell align="left">
                            {dob}
                          </TableCell>

                          <TableCell align="right">
                            <MenuItem
                              onClick={(e) => handleEditClick(e, id)}
                              // component={RouterLink}
                              // to="/edit"
                              sx={{ color: 'text.secondary' }}
                            >
                              <ListItemIcon>
                                <Iconify
                                  icon="eva:edit-fill"
                                  width={24}
                                  height={24}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Edit"
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </MenuItem>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  )
}
