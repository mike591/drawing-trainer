import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "hooks/useQuery";
import { publicRoutes } from "utils/routes";
import { useDrawing } from "hooks/useDrawing";
import { Container, Card, Image } from "semantic-ui-react";
import dayjs from "dayjs";

const SharePage = () => {
  const history = useHistory();
  const query = useQuery();
  const drawingID = query.get("drawingId");
  if (!drawingID) {
    history.push(publicRoutes.login.path);
  }

  const { drawing } = useDrawing(drawingID);
  const prompt = `${drawing.adjective || ""} ${drawing.noun || ""}`;
  const date = dayjs.unix(drawing?.createdAt?.seconds);

  return (
    <Container className="SharePage">
      <Card>
        <Image src={drawing.imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{prompt}</Card.Header>
          <Card.Meta>{date.format("DD/MM/YYYY hh:mm:ssa")}</Card.Meta>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default SharePage;
