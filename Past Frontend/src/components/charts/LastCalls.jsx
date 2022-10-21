import PropTypes from "prop-types";
// material
import { Card, Typography, CardHeader, CardContent, TableRow, TableCell } from "@mui/material";
import {
    Timeline,
    TimelineItem,
    TimelineContent,
    TimelineConnector,
    TimelineSeparator,
    TimelineDot,
    TimelineOppositeContent
} from "@mui/lab";

import Iconify from "../general/Iconify";
// utils
import { formatTime } from "../../utils/formatTime";
// ----------------------------------------------------------------------

OrderItem.propTypes = {
    item: PropTypes.object,
    isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
    const { type, title, time, phone } = item;
    return (
        <TimelineItem position="right">
            <TimelineOppositeContent color="text.secondary">
                <TableRow>
                    <TableCell align="left">
                        <Typography variant="body1">{type}</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="body2" color="textSecondary" align="left">
                            {formatTime(time)}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot
                    sx={{
                        bgcolor:
                            (type === "שירות" && "blue") ||
                            (type === "הצטרפות" && "success.main") ||
                            (type === "תלונה" && "purple") ||
                            (type === "ניתוק" && "red") ||
                            "error.main"
                    }}
                >
                    <Iconify
                        icon={
                            (type === "שירות" && "ri:customer-service-2-fill") ||
                            (type === "הצטרפות" && "carbon:user-follow") ||
                            (type === "תלונה" && "carbon:user-simulation") ||
                            (type === "ניתוק" && "la:user-alt-slash") ||
                            "ri:customer-service-2-fill"
                        }
                        width={24}
                        height={24}
                    />
                </TimelineDot>
                {isLast ? null : <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
                <TableRow>
                    <TableCell align="right">
                        <Typography variant="body1">{phone}</Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="body1">{title}</Typography>
                    </TableCell>
                </TableRow>
            </TimelineContent>
        </TimelineItem>
    );
}

export default function LastCalls({ data }) {
    return (
        <Card
            sx={{
                "& .MuiTimelineItem-missingOppositeContent:before": {
                    display: "none"
                }
            }}
        >
            <CardHeader title="שיחות אחרונות שהתקבלו במערכת" />
            <CardContent>
                <Timeline position="right">
                    {data.map((item, index) => (
                        <OrderItem
                            key={item.title}
                            item={item}
                            isLast={index === data.length - 1}
                        />
                    ))}
                </Timeline>
            </CardContent>
        </Card>
    );
}
