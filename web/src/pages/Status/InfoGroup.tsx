import { InfoItem, InfoItemData } from "./InfoItem";

interface InfoGroupProps {
  name: string;
  items: [InfoItemData];
}

export { InfoItemData };

export function InfoGroup(props: InfoGroupProps) {
  return (
    <div className="InfoGroup">
      <div className="card">
        <div className="card-body">
          <div className="card-title pb-2">
            <h4>{props.name}</h4>
          </div>
          <ul className="list-group">
            {props.items.map((item) => {
              return (
                <InfoItem
                  key={`${this.props.name}:${item.name}`}
                  name={item.name}
                  value={item.value}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
