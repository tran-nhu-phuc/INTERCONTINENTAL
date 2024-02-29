import "./comment.css";
import ContentComment from "../content-comment/content-comment";
import RatingComment from "../rating-comment/rating-comment";
import { MdOutlineStarRate } from "react-icons/md";
import { Select, Space } from "antd";
import { Pagination } from "antd";
import ImageRoomComment from "../image-room-comment/image-room-comment";
import CommentWriting from "../ratting-comment/writing-comment";
import RateStar from "../rate-star/rate-star";
import { useEffect, useMemo, useState } from "react";
import RoomService from "../../services/room-service";
import { useParams } from "react-router-dom";
import CommentService from "../../services/comment-services";
import RattingService from "../../services/ratting-services";
import OrderService from "../../services/order-service";
import useSocket from "../../hooks/useSocket";
const CommentBooking = () => {
  const { id }: any = useParams();
  const socket = useSocket();
  const userId: any = localStorage.getItem("tokenId");
  const [getDataRoom, setGetDataRoom] = useState<any>();
  const [getDataComment, setGetDataComment] = useState<any>();
  const [statusCallComment, setStatusCallComment] = useState<boolean>(false);
  const [isOpenRatting, setIsOpenRatting] = useState<boolean>(false);
  const [dataRatting, setDataRatting] = useState<any>();
  const [dataSelect, setDataSelect] = useState<string>("");
  const [dataRenderComment, setDataRenderComment] = useState<any>();
  const [reviewsByRating, setReviewsByRating] = useState<any>();
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const handlePopUpRatting = (statusRatting: boolean) => {
    setIsOpenRatting(statusRatting);
  };
  const handleChange = (value: string) => {
    setDataSelect(value);
  };
  const handelClickScrollToTop = () => {
    window.scroll(0, 1000);
  };

  const percentageByRating = useMemo(() => {
    try {
      return reviewsByRating?.map((reviews: any, index: number) => {
        return {
          rating: index + 1,
          percentage: (reviews / dataRatting?.length) * 100,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }, [reviewsByRating, dataRatting]);

  useEffect(() => {
    const calculateReviewsByRating = () => {
      if (dataRatting) {
        setReviewsByRating([
          dataRatting.filter((item: any) => item?.rate === 1)?.length || 0,
          dataRatting.filter((item: any) => item?.rate === 2)?.length || 0,
          dataRatting.filter((item: any) => item?.rate === 3)?.length || 0,
          dataRatting.filter((item: any) => item?.rate === 4)?.length || 0,
          dataRatting.filter((item: any) => item?.rate === 5)?.length || 0,
        ]);
      } else {
        setReviewsByRating([0, 0, 0, 0, 0]);
      }
    };
    calculateReviewsByRating();
  }, [dataRatting]);
  useEffect(() => {
    const callBooking = async () => {
      try {
        const bookingServices = new OrderService();
        const result = await bookingServices.getAllByUser(Number(userId));
        if (result?.data) {
          const data = await result?.data?.findIndex((item: any) => {
            return item?.roomId == id;
          });
          if (data !== -1) {
            setIsOpenComment(true);
          } else {
            setIsOpenComment(false);
          }
        } else {
          setIsOpenComment(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callBooking();
  }, []);
  useEffect(() => {
    const callDataRoom = async () => {
      try {
        const roomServices = new RoomService();
        const result = await roomServices.getInformation(Number(id));
        setGetDataRoom(result?.data);
      } catch (error) {
        console.log(error);
      }
    };
    callDataRoom();
  }, []);
  useEffect(() => {
    const callDataComment = async () => {
      try {
        const commentServices = new CommentService();
        const resultComment = await commentServices.getAllByRoom(Number(id));
        setGetDataComment([...resultComment?.data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    callDataComment();
  }, [statusCallComment, isOpenRatting]);
  useEffect(() => {
    const callDataComment = async () => {
      try {
        const commentServices = new CommentService();
        const resultComment = await commentServices.getAllByRoom(Number(id));
        setGetDataComment([...resultComment?.data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    socket.on(`comment`, (roomId: any) => {
      if (id == roomId?.roomId) {
        callDataComment();
      }
    });
    socket.on(`like`, (commentId: any) => {
      callDataComment();
    });
    socket.on(`delete`, (commentId: any) => {
      callDataComment();
    });
  }, [socket]);
  useEffect(() => {
    const callRateStarByRoom = async () => {
      try {
        const rateServices = new RattingService();
        const result = await rateServices.getAllByRoom(
          Number(id),
          Number(userId)
        );
        setDataRatting([...result?.allData]);
        if (result.status === false && isOpenComment) {
          handlePopUpRatting(true);
        } else {
          handlePopUpRatting(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callRateStarByRoom();
  }, [isOpenRatting, isOpenComment]);
  useEffect(() => {
    const selectData = () => {
      try {
        if (dataSelect) {
          return getDataComment?.filter((item: any) => {
            return item?.user?.rattings[0]?.rate == dataSelect;
          });
        } else {
          return getDataComment;
        }
      } catch (error) {
        console.log(error);
      }
    };
    setDataRenderComment(selectData());
  }, [dataSelect]);
  return (
    <div className="table-star-comment">
      <div className="header-payment">
        <h1>Comment</h1>
      </div>
      <div className="box-list-image-room-comment">
        <p>{getDataRoom?.name}</p>
        <ImageRoomComment getDataRoom={getDataRoom} />
      </div>
      <div className="box-rate-star-comment">
        <strong>
          OVERALL RATING
          <MdOutlineStarRate />
        </strong>
        <strong>4.0 out of 5</strong>
        {percentageByRating?.map((item: any) => {
          return (
            <RatingComment
              number={item?.rating}
              value={item?.percentage}
              percent={item?.percentage?.toFixed(0)}
            />
          );
        })}
        <p onClick={handelClickScrollToTop}>
          See all {dataRatting?.length} reviews
        </p>
      </div>
      <div className="header-text-comment">
        <h2>CheapOair Reviews</h2>
        <div className="sort-comment-user">
          <span>Filter by</span>
          <Space wrap>
            <Select
              defaultValue="any"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "", label: "Any" },
                { value: "5", label: "5 Star" },
                { value: "4", label: "4 Star" },
                { value: "3", label: "3 Star" },
                { value: "2", label: "2 Star" },
                { value: "1", label: "1 Star" },
              ]}
              rootClassName="click-sort-star"
            />
          </Space>
        </div>
      </div>
      <div className="writing-comment">
        {isOpenComment ? <CommentWriting idRoom={id} userId={userId} /> : null}
      </div>
      <div className="box-comment">
        {dataSelect
          ? dataRenderComment?.map((item: any) => {
              return (
                <ContentComment
                  item={item}
                  statusCallComment={statusCallComment}
                />
              );
            })
          : getDataComment?.map((item: any) => {
              return (
                <ContentComment
                  item={item}
                  statusCallComment={statusCallComment}
                />
              );
            })}
      </div>
      <div className="pagination-comment">
        <Pagination defaultCurrent={5} total={getDataComment?.length} />
      </div>
      {isOpenRatting ? (
        <RateStar
          getDataRoom={getDataRoom}
          handlePopUpRatting={handlePopUpRatting}
        />
      ) : null}
    </div>
  );
};
export default CommentBooking;
