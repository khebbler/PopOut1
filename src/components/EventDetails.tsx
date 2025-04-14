import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Rating,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import formatDate from "../utils/formatDate";

type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  venue_name: string;
  location: string;
  isFree: boolean;
  isKidFriendly: boolean;
  isSober: boolean;
  vendor: {
    businessName: string;
    averageRating?: number;
  };
  Categories?: { name: string }[];
};

interface Props {
  open: boolean;
  onClose: () => void;
  event: Event | null;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  minWidth: 300,
  maxWidth: 500,
};

const EventDetails: React.FC<Props> = ({ open, onClose, event }) => {
  const [bookmarked, setBookmarked] = useState(false);

  if (!event) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{event.title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Hosted by:</strong> {event.vendor.businessName}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Venue:</strong> {event.venue_name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 0.5 }}>
          <strong>Address:</strong> {event.location.replace(/,\s*USA$/, "")}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Date & Time:</strong>{" "}
          {formatDate(event.startDate, event.endDate)}
        </Typography>

        {(event.Categories?.length ||
          event.isFree ||
          event.isKidFriendly ||
          event.isSober) && (
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            {event.Categories?.map((cat) => (
              <Chip
                key={cat.name}
                label={cat.name}
                variant="outlined"
                size="small"
                sx={{ fontSize: "0.75rem" }}
              />
            ))}
            {event.isFree && (
              <Chip
                label="Free"
                size="small"
                sx={{ fontSize: "0.75rem", bgcolor: "#4caf50", color: "#fff" }}
              />
            )}
            {event.isKidFriendly && (
              <Chip
                label="Kid-Friendly"
                size="small"
                sx={{ fontSize: "0.75rem", bgcolor: "#ffeb3b", color: "#000" }}
              />
            )}
            {event.isSober && (
              <Chip
                label="Sober"
                size="small"
                sx={{ fontSize: "0.75rem", bgcolor: "#2196f3", color: "#fff" }}
              />
            )}
          </Stack>
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Box>
            <Typography variant="body2">
              <strong>Average Rating:</strong>
            </Typography>
            <Rating
              value={event.vendor.averageRating || 0}
              precision={0.5}
              readOnly
              sx={{ mt: 0.5 }}
            />
          </Box>
          <Tooltip
            title={bookmarked ? "Remove from bookmarks" : "Bookmark this event"}
          >
            <IconButton
              onClick={() => setBookmarked((prev) => !prev)}
              aria-label={bookmarked ? "Unbookmark" : "Bookmark"}
              sx={{ ml: 2 }}
            >
              {bookmarked ? (
                <BookmarkIcon color="primary" />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EventDetails;
