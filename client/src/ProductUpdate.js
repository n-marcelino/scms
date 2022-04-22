import React, { useState, useEffect } from "react";

export default function ProductUpdate() {
    return (
        <div>
            <div class="form-group w-50 p-3">
                <div className="p-3">
                    <h2>Editing...</h2>
                    <hr />
                    <div class="pt-4 d-flex gap-3">
                        <button
                            class="form-control btn-warning"
                            onClick={() => { handleSave() }}
                        >
                            Confirm
                        </button>
                        <button
                            class="form-control btn-danger"
                            onClick={() => { history.back() }}
                        >
                            Cancel
                        </button>
                    </div>

                    <hr />
                    <div>
                        <h4 class="text-danger">
                            DANGER ZONE
                        </h4>
                        <button
                            class="form-control btn-danger"
                            onClick={() => { }}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}