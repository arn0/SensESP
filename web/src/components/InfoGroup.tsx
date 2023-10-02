import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from "@mui/material/List";

import { InfoItem, InfoItemData } from "./InfoItem";

interface InfoGroupProps {
  name: string;
  items: [InfoItemData];
}

export { InfoItemData };

export function InfoGroup(props: InfoGroupProps) {
  console.log("InfoGroup:", props.items);
  return (
    <div className="InfoGroup">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}><strong>{props.name}</strong></AccordionSummary>
        <AccordionDetails>
          <List dense disablePadding>
            {props.items.map((item) => {
              return (
                <InfoItem
                  key={`${this.props.name}:${item.name}`}
                  name={item.name}
                  value={item.value}
                />
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
