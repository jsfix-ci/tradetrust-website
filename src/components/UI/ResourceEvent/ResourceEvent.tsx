import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { formatTime } from "../../../common/utils/dateTime";
import { Link } from "react-router-dom";

export type EventProps = {
  slug: string;
  attributes: EventAttribute;
};
interface EventAttribute {
  title: string;
  thumbnail?: string;
  blurb: string;
  link: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  videoLink?: string;
  slides?: string;
  registerLink?: string;
  location?: string;
  downloadableMediaContent?: string[];
  eventDetails?: string;
}

export const ResourceEvent: FunctionComponent<EventProps> = ({ slug, attributes }) => {
  const { title, thumbnail, blurb, date, timeStart, timeEnd } = attributes;
  const eventLink = slug;

  return (
    <Link to={`event/${eventLink}`}>
      <div className="flex flex-wrap rounded-xl shadow-xl mb-4">
        {thumbnail && (
          <img className="object-cover rounded-t-xl md:w-4/12 md:rounded-none md:rounded-l-xl" src={thumbnail} />
        )}

        <div
          className={`w-full bg-white px-5 pt-3 pb-5 ${
            thumbnail ? "rounded-b-xl md:w-8/12 md:rounded-none md:rounded-r-xl" : "rounded-xl"
          }`}
        >
          <h4 className="mb-2 text-cloud-800">{title}</h4>
          <div className="text-cloud-300 text-base font-medium pb-3">
            <span>{format(new Date(date), "d MMM yyyy")}</span>
            {timeStart && timeEnd && (
              <>
                <span className="mx-1">|</span>
                <span>
                  {formatTime(timeStart, "HH:mm")} to {formatTime(timeEnd, "HH:mm")} ({formatTime(timeStart, "zzz")})
                </span>
              </>
            )}
          </div>
          <p className="text-cloud-800 font-normal mb-4">{blurb}</p>
          <h5 className="text-cerulean-300 hover:text-cerulean-500">Click to find out more</h5>
        </div>
      </div>
    </Link>
  );
};
