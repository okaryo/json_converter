import { AppBar, Button, Container, FormControl, Input, InputLabel, List, ListItem, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'

const Home: NextPage = () => {
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
                rows={5}
                defaultValue=""
                multiline
                fullWidth
              />
            </ListItem>

            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <InputLabel shrink>Format</InputLabel>
              <TextField
                rows={5}
                defaultValue=""
                multiline
                fullWidth
              />
            </ListItem>

            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <Button variant="contained" sx={{width: "100%"}}>CONVERT</Button>
            </ListItem>
            
            <ListItem sx={{dispaly: "flex", flexDirection: "column", alignItems: "start", p: 0, mb: 3}}>
              <InputLabel shrink>Output</InputLabel>
              <TextField
                rows={5}
                defaultValue=""
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
