import React from "react";

const Modal = props => (
    <div className="modal fade" id={"modal-" + props.modalID} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{props.name} - {props.time}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-6">
                            <span className="font-weight-bold text-primary">Name: </span><span>{props.name}</span><br />
                            <span className="font-weight-bold text-primary">Repair: </span><span>{props.repair}</span><br />
                            <span className="font-weight-bold text-primary">Status: </span><span>{props.completeStatus ? "Completed" : "Not Complete"}</span><br />
                        </div>
                        <div className="col-6">
                            <span className="font-weight-bold text-primary">Device: </span><span>{props.device}</span><br />
                            <span className="font-weight-bold text-primary">IMEI: </span><span>{props.imei}</span><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <span className="font-weight-bold text-primary">Notes:</span>
                            <p>{props.notes}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Modal;