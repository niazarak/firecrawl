import express from "express";
import { redisHealthController } from "../controllers/v0/admin/redis-health";
import {
  autoscalerController,
  checkQueuesController,
  cleanBefore24hCompleteJobsController,
  queuesController,
} from "../controllers/v0/admin/queue";
import { wrap } from "./v1";
import { acucCacheClearController } from "../controllers/v0/admin/acuc-cache-clear";
import { doctorController } from "../controllers/v1/admin/doctor";
import { doctorStatusController } from "../controllers/v1/admin/doctor-status";

export const adminRouter = express.Router();

adminRouter.get(
  `/admin/${process.env.BULL_AUTH_KEY}/redis-health`,
  redisHealthController
);

adminRouter.get(
  `/admin/${process.env.BULL_AUTH_KEY}/clean-before-24h-complete-jobs`,
  cleanBefore24hCompleteJobsController
);

adminRouter.get(
  `/admin/${process.env.BULL_AUTH_KEY}/check-queues`,
  checkQueuesController
);

adminRouter.get(
  `/admin/${process.env.BULL_AUTH_KEY}/queues`,
  queuesController
);

adminRouter.get(
  `/admin/${process.env.BULL_AUTH_KEY}/autoscaler`,
  autoscalerController
);

adminRouter.post(
  `/admin/${process.env.BULL_AUTH_KEY}/acuc-cache-clear`,
  wrap(acucCacheClearController),
);

adminRouter.post(
  `/admin/${process.env.BULL_AUTH_KEY}/doctor`,
  wrap(doctorController),
);

adminRouter.get(
  `/admin/${process.env.BULL_AUTH_KEY}/doctor/:id`,
  wrap(doctorStatusController),
);
