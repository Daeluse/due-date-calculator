import express from 'express';

import { DueDateService } from '../services/due-date';
import { HolidayChecker } from '../utilities/holiday-checker';
import { DateInfo } from '../utilities/date-info';

const DueDateController = express.Router();

DueDateController.get('/', (req, res) => {
  const {
    submission,
    duration,
  } = req.query;

  if (submission == null || duration == null) {
    // Reflect missing parameter state
    res.status(422);
    res.send();
    return;
  }

  if (typeof submission != 'string' || typeof duration != 'string') {
    // Reflect bad request state
    res.status(400);
    res.send();
    return;
  }

  const parsedSubmission = parseInt(submission);
  const parsedDuration = parseInt(duration);

  if (Number.isNaN(parsedSubmission) || Number.isNaN(parsedDuration)) {
    // Reflect bad request state
    res.status(400);
    res.send();
    return;
  }

  const service = new DueDateService(new HolidayChecker(new DateInfo()));
  const result = service.CalculateDueDate(new Date(parsedSubmission), parsedDuration);

  res.status(200);
  res.send(result.toTimeString());
});

export {
  DueDateController,
}