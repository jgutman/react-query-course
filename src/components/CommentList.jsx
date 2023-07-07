import { useUserData } from "../helpers/useUserData";
import { relativeDate } from "../helpers/relativeDate";

export default function CommentList({comments}) {

    const Comment = ({ createdBy, createdDate, comment }) => {
        const {data: commenter, isSuccess: commenterIsSuccess} = useUserData(createdBy);

        return (
          <div className="comment">
            {commenterIsSuccess ?
                <img src={commenter.profilePictureUrl} 
                     alt={`Comment by ${commenter.name}`} 
                /> :
                null
            }
            <div>
                <div className="comment-header">
                    <span>
                        {commenterIsSuccess ? commenter.name : ""}
                    </span>
                    {" "} commented {relativeDate(createdDate)}
                </div>
                <div className="comment-body">
                    {comment}
                </div>
            </div>
          </div>
        );
    }

    return (
        <section>
            {
                comments.map((comment) => (
                    <Comment key={comment.id} {...comment} />
                ))
            }
        </section>
    )
}