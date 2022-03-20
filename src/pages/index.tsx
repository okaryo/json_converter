import { AppBar, Button, Container, InputLabel, List, ListItem, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { JsonConverter } from '../model/JsonConverter'
import { converterSlice, RootState } from '../store'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const converter = useSelector((state: RootState) => state.converter.jsonConverter)
  const output = useSelector((state: RootState) => state.converter.output)
  const [error, setError] = useState(false)

  const onChangeInputJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!JsonConverter.canConvert(value)) {
      setError(true)
    } else {
      dispatch(converterSlice.actions.updateInputJson(JSON.parse(value)))
      setError(false)
    }
  }

  const onChangeFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch(converterSlice.actions.updateFormat(value))
  }

  const onClickConvert = () => {
    dispatch(converterSlice.actions.convert())
  }

  return (
    <div>
      <Head>
        <title>JsonConverter</title>
        <meta name="description" content="Format JSON as you like" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppBar position="static" sx={{p: 1}}>
          <Typography variant="h6" component="h1">JsonConverter</Typography>
        </AppBar>

        <Container sx={{p: 2, maxWidth: 600}} >
          <List>
            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <InputLabel shrink>Input Json</InputLabel>
              <TextField
                minRows={5}
                defaultValue={JSON.stringify(converter.inputJson, null, 2)}
                helperText={error ? 'Invalid json format!!' : ''}
                error={error}
                multiline
                fullWidth
                onChange={onChangeInputJson}
              />
            </ListItem>

            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <InputLabel shrink>Format</InputLabel>
              <TextField
                minRows={5}
                value={converter.format}
                helperText="The Json value is embedded in the key enclosed in `$`."
                multiline
                fullWidth
                onChange={onChangeFormat}
              />
            </ListItem>

            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <Button
                variant="contained"
                sx={{width: "100%"}}
                onClick={onClickConvert}
              >
                CONVERT
              </Button>
            </ListItem>
            
            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <InputLabel shrink>Output</InputLabel>
              <TextField
                minRows={5}
                value={output}
                multiline
                fullWidth
              />
            </ListItem>
          </List>
        </Container>
      </main>

      <Footer />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home
