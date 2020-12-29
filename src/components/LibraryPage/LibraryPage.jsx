import React from "react";
import {
  Container,
  Button,
  Icon,
  Card,
  Image,
  Grid,
  Modal,
  Header,
} from "semantic-ui-react";
import { privateRoutes } from "utils/routes";
import { useHistory } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useDrawings } from "hooks/useDrawings";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { publicRoutes } from "utils/routes";

const LibraryPage = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { drawings, deleteDrawing } = useDrawings(user);
  const [drawing, setDrawing] = React.useState();
  const [copied, setCopied] = React.useState({});

  const handleSetCopied = (id) => {
    setCopied((last) => ({ ...last, [id]: true }));
    window.setTimeout(() => {
      setCopied((last) => ({ ...last, [id]: false }));
    }, 1000);
  };

  return (
    <Container className="LibraryPage">
      <Modal
        className="LibraryPage_modal"
        onClose={() => setDrawing()}
        open={Boolean(drawing)}
        size="small"
      >
        <Header>{`${drawing?.adjective} ${drawing?.noun}`}</Header>
        <Modal.Content>
          <Image src={drawing?.imageUrl} wrapped ui={false} />
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={() => setDrawing(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      <div className="_header">
        <Button
          className="return-button"
          icon
          onClick={() => history.push(privateRoutes.home.path)}
        >
          <Icon name="arrow left" />
        </Button>
      </div>
      <Grid columns={3}>
        {drawings.map((drawing) => {
          const prompt = `${drawing.adjective} ${drawing.noun}`;
          const date = dayjs.unix(drawing.createdAt.seconds);
          return (
            <Grid.Column key={drawing.id} onClick={() => setDrawing(drawing)}>
              <Card>
                <Image src={drawing.imageUrl} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{prompt}</Card.Header>
                  <Card.Meta>{date.format("DD/MM/YYYY hh:mm:ssa")}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div className="_actions">
                    <CopyToClipboard
                      text={`${window.location.host}${publicRoutes.share.path}?drawingId=${drawing.id}`}
                      onCopy={() => handleSetCopied(drawing.id)}
                    >
                      <Button
                        color="blue"
                        onClick={(e) => e.stopPropagation()}
                        disabled={copied[drawing.id]}
                      >
                        {copied[drawing.id] ? "Copied" : "Share"}
                      </Button>
                    </CopyToClipboard>
                    <Button
                      icon
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDrawing(drawing.id);
                      }}
                    >
                      <Icon name="trash"></Icon>
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>
    </Container>
  );
};

export default LibraryPage;
