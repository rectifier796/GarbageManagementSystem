import mongoose from "mongoose";
import { generateResponse } from "../helpers/response.helper.js";
import regionModel from "../model/region.model.js";
import queryModel from "../model/query.model.js";
import fs from "fs";
import { validationResult } from "express-validator";
import { isValidObjectId } from "../helpers/mongoose.helper.js";

export const registerQuery = async (req, res) => {
  const {
    phone,
    description,
    wasteType,
    regionId,
    address,
    latitude,
    longitude,
  } = req.fields;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.errors)
    const allError = errors.errors.map((e) => e.msg);
    return generateResponse(res, 400, allError, null, false);
  }

  if (!mongoose.isValidObjectId(regionId)) {
    return generateResponse(res, 400, "Invalid Region Id", null, false);
  }

  if (
    wasteType !== "Non-Hazardous" &&
    wasteType !== "Bulky" &&
    wasteType !== "Hazardous"
  ) {
    return generateResponse(res, 400, "Invalid Waste Type", null, false);
  }

  const region = await regionModel.findById(regionId);
  if (!region) {
    return generateResponse(res, 400, "No Region Found", null, false);
  }

  if (!req.files.photo) {
    return generateResponse(res, 400, "Photo Required", null, false);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const query = await queryModel.create({
      userId: req.userId,
      description,
      phone,
      wasteType,
      regionId,
      address,
      latitude,
      longitude,
    });

    const images = Array.isArray(req.files.photo)
      ? req.files.photo
      : [req.files.photo];

    //   console.log(images);

    const pData = images.map((p) => {
      return {
        data: fs.readFileSync(p.path),
        contentType: p.type,
      };
    });

    console.log(pData);

    query.photo = pData;

    await query.save();

    await session.commitTransaction();
    return generateResponse(res, 201, "Created successfully", null, true);
  } catch (err) {
    await session.abortTransaction();
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  } finally {
    await session.endSession();
  }
};

export const registerRegion = async (req, res) => {
  const { name, pincode } = req.fields;

  console.log(req.fields);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.errors)
    const allError = errors.errors.map((e) => e.msg);
    return generateResponse(res, 400, allError, null, false);
  }

  try {
    const region = await regionModel.create({ name, pincode });

    return generateResponse(res, 201, "Created successfully", null, true);
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const getRegion = async (req, res) => {
  const { name, pincode } = req.query;

  const config = {};

  if (pincode) {
    config["pincode"] = pincode;
  }

  console.log(config);

  let allRegion = await regionModel.find(config).select("name pincode");

  if (name) {
    allRegion = allRegion.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  return generateResponse(res, 200, "Region Data Fetched", allRegion, true);
};

export const getQuery = async (req, res) => {
  try {
    const config = {};
    const { wasteType, regionId, status } = req.query;
    if (wasteType) {
      config["wasteType"] = wasteType;
    }
    if (!mongoose.isValidObjectId(regionId)) {
      config["regionId"] = regionId;
    }
    if (status) {
      config["status"] = status;
    }

    console.log(config);

    const allQuery = await queryModel.find(config).select("-photo");

    return generateResponse(res, 200, "Query Data Fetched", allQuery, true);
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const getQueryByUserId = async (req, res) => {
  try {
    const allRegion = await queryModel
      .find({ userId: req.userId })
      .select("-photo");

    return generateResponse(res, 200, "Region Data Fetched", allRegion, true);
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};
